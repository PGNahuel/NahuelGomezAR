import { readFile, readdir, writeFile, mkdir, copyFile, unlink } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { build } from 'esbuild';
import { parseMarkdown } from '../src/lib/markdown.js';
import { articlePath, profilePath } from '../src/articlePaths.js';
import { profile } from '../src/profile/profile.js';

const siteUrl = 'https://nahuelgomez.ar';
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(projectRoot, 'dist');
const articles = JSON.parse(await readFile(resolve(projectRoot, 'src/tablecontent.json'), 'utf8'));
const markdownFiles = (await readdir(resolve(projectRoot, 'public/articules'))).filter((file) => file.endsWith('.md'));
const registeredFiles = new Set(articles.map((article) => article.file));

if (registeredFiles.size !== articles.length || articles.some((article) => !markdownFiles.includes(article.file)) || markdownFiles.some((file) => !registeredFiles.has(file))) {
  throw new Error('Los archivos Markdown y src/tablecontent.json deben coincidir uno a uno.');
}
if (new Set(articles.map((article) => article.id)).size !== articles.length) {
  throw new Error('Hay identificadores de artículos duplicados.');
}
if (articles.some((article) => !/^[a-z0-9-]+$/.test(article.id) || !article.title || !article.description || !article.author)) {
  throw new Error('Cada artículo necesita un ID válido, título, descripción y autor.');
}

const professionalExperience = articles.find((article) => article.id === 'personal-experience');
if (!professionalExperience) {
  throw new Error('Falta el artículo de experiencia profesional.');
}
const professionalExperienceArticle = {
  ...professionalExperience,
  content: parseMarkdown(await readFile(resolve(projectRoot, 'public/articules', professionalExperience.file), 'utf8'))
};

const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const escapeHtml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const absoluteUrl = (path) => `${siteUrl}${path}`;

const personSchema = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: profile.fullName,
  alternateName: profile.name,
  description: profile.description,
  url: absoluteUrl(profilePath),
  sameAs: [profile.linkedIn, profile.github]
};

function pageHtml({ path, title, description, type, markup, schema, article = null, image = null }) {
  const url = absoluteUrl(path);
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${escapeHtml(url)}">`)
    .replace(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${type}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(description)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${escapeHtml(url)}">`);

  const extraHead = `${image ? `<meta property="og:image" content="${escapeHtml(absoluteUrl(image))}">` : ''}\n<script type="application/ld+json">${safeJson(schema)}</script>`;
  html = html.replace('</head>', `${extraHead}\n  </head>`);
  const initialData = article ? `<script>window.__INITIAL_ARTICLE__=${safeJson(article)};</script>` : '';
  html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>${initialData}`);
  if (!html.includes(markup) || !html.includes(`href="${url}"`)) throw new Error(`No se pudo generar ${path}`);
  return html;
}

async function writePage(path, html) {
  const target = resolve(dist, path.slice(1), 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

const ssrBundle = resolve(projectRoot, 'scripts/.prerender-app.mjs');
await build({
  entryPoints: [resolve(projectRoot, 'src/App.jsx')],
  outfile: ssrBundle,
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  loader: { '.css': 'empty' }
});

try {
  const { AppContent } = await import(ssrBundle);
  const render = (path, initialArticle = null) => renderToString(
    React.createElement(StaticRouter, { location: path }, React.createElement(AppContent, { initialArticle }))
  );

  const homePath = '/';
  const homeTitle = 'Nahuel Gómez | Backend, sistemas y crecimiento profesional';
  const homeDescription = 'Ideas prácticas para diseñar, construir y sostener mejores sistemas: backend, arquitectura, observabilidad y crecimiento profesional.';
  const websiteSchema = { '@context': 'https://schema.org', '@graph': [personSchema, { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'Nahuel Gómez', url: siteUrl, description: homeDescription, author: { '@id': personSchema['@id'] } }] };
  await writeFile(resolve(dist, 'index.html'), pageHtml({ path: homePath, title: homeTitle, description: homeDescription, type: 'website', markup: render(homePath), schema: websiteSchema, image: '/img/yo.webp' }));

  await writePage(profilePath, pageHtml({
    path: profilePath,
    title: `Sobre mí | ${profile.name}`,
    description: profile.description,
    type: 'profile',
    markup: render(profilePath, professionalExperienceArticle),
    schema: { '@context': 'https://schema.org', '@graph': [personSchema, { '@type': 'ProfilePage', mainEntity: { '@id': personSchema['@id'] }, url: absoluteUrl(profilePath) }] },
    article: professionalExperienceArticle,
    image: '/img/yo.webp'
  }));

  for (const article of articles) {
    const markdown = await readFile(resolve(projectRoot, 'public/articules', article.file), 'utf8');
    const content = parseMarkdown(markdown);
    const initialArticle = { ...article, content };
    const path = articlePath(article.id);
    const image = `/img/img-${article.img}`;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      author: { '@id': personSchema['@id'] },
      mainEntityOfPage: absoluteUrl(path),
      image: absoluteUrl(image)
    };
    await writePage(path, pageHtml({ path, title: `${article.title} | ${profile.name}`, description: article.description, type: 'article', markup: render(path, initialArticle), schema, article: initialArticle, image }));
  }

  const paths = [homePath, profilePath, ...articles.map((article) => articlePath(article.id))];
  await writeFile(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${escapeHtml(absoluteUrl(path))}</loc></url>`).join('\n')}\n</urlset>\n`);
  const legacyRedirects = articles.map((article) => `RewriteCond %{QUERY_STRING} ^id=${article.id}$ [NC]\nRewriteRule ^$ ${articlePath(article.id)} [R=301,L,QSD]`).join('\n\n');
  await writeFile(resolve(dist, '.htaccess'), `<IfModule mod_rewrite.c>\nRewriteEngine On\n${legacyRedirects}\n</IfModule>\n\nErrorDocument 404 /404.html\n`);
  await writeFile(resolve(dist, '404.html'), `<!doctype html>\n<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Página no encontrada | ${profile.name}</title><link rel="stylesheet" href="/css/templatemo-upright.css"><link rel="stylesheet" href="/css/pgnahuel.css"></head><body><main class="maincontent"><h1>Página no encontrada</h1><p>La dirección solicitada no existe.</p><p><a href="/">Volver al inicio</a></p></main></body></html>\n`);
  await writeFile(resolve(dist, 'schema.jsonld'), `${JSON.stringify(websiteSchema, null, 2)}\n`);
  await writeFile(resolve(dist, 'llms.txt'), `# ${profile.name}\n\n> ${profile.description}\n\n## Páginas principales\n- [Sobre mí](${absoluteUrl(profilePath)}): trayectoria, temas y enlaces profesionales.\n- [Inicio](${siteUrl}/): índice de contenidos.\n\n## Artículos\n${articles.map((article) => `- [${article.title}](${absoluteUrl(articlePath(article.id))}): ${article.description}`).join('\n')}\n\n## Perfiles\n- [LinkedIn](${profile.linkedIn})\n- [GitHub](${profile.github})\n`);
  await copyFile(resolve(projectRoot, 'CV_Nahuel_Gomez_Senior_Backend_Engineer.pdf'), resolve(dist, 'CV_Nahuel_Gomez_Senior_Backend_Engineer.pdf'));
  console.log(`Páginas estáticas generadas: ${paths.length}.`);
} finally {
  await unlink(ssrBundle);
}
