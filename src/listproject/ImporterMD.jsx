import tableContent from "../tablecontent.json";
import { marked } from "marked";

const renderer = new marked.Renderer();

function escapeHtml(html) {
    return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

renderer.code = function (code) {
    const lang = (code.lang || "").trim();
    const safeCode = typeof code.text === "string" ? code.text : String(code.text);

    if (lang === "mermaid") {
        return `<pre class="mermaid">\n${safeCode}\n</pre>`;
    }

    return `<pre><code class="language-${lang}">${escapeHtml(safeCode)}</code></pre>`;
};

marked.setOptions({
    renderer,
    gfm: true,
    breaks: true,
    langPrefix: 'language-',
});

async function fetchAndParseMarkdown(filePath) {
    try {
        const res = await fetch(filePath);
        if (!res.ok) {
            console.error(`Error ${res.status}: No se pudo cargar ${filePath}`);
            throw new Error(`Error loading file: ${filePath} (${res.status})`);
        }
        const markdown = await res.text();
        const html = marked.parse(markdown);
        return html;
    } catch (err) {
        console.error("Error fetching markdown:", err);
        return `<p>Error loading content: ${err.message}</p>`;
    }
}

async function importMarkdownByID(id) {
    const filenames = tableContent.filter((element) => { return element.id == id });

    if (filenames.length === 0) {
        console.error(`No se encontró artículo con ID: ${id}`);
        return null;
    }

    try {
        const arts = await Promise.all(filenames.map(async f => {
            const htmleado = await fetchAndParseMarkdown(`/articules/${f.file}`);
            return {
                id: f.id,
                title: f.title,
                author: f.author,
                content: htmleado,
                img: f.img,
                tags: f.tags || []
            };
        }));

        if (arts.length > 0) {
            return arts[0];
        }
    } catch (error) {
        console.error(`Error al cargar el artículo ID ${id}:`, error);
    }
    
    return null;
}

async function importAllMarkdown() {
    const filenames = tableContent;
    
    try {
        const arts = await Promise.all(filenames.map(async f => {
            const html = await fetchAndParseMarkdown(`/articules/${f.file}`);
            return {
                id: f.id,
                title: f.title,
                author: f.author,
                content: html,
                img: f.img
            };
        }));

        return arts;
    } catch (error) {
        console.error("Error al cargar todos los artículos:", error);
        return [];
    }
}

export default { importAllMarkdown, importMarkdownByID }