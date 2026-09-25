import { marked } from 'marked';

const renderer = new marked.Renderer();

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

renderer.code = function (code) {
  const lang = (code.lang || '').trim();
  const safeCode = typeof code.text === 'string' ? code.text : String(code.text);
  if (lang === 'mermaid') return `<pre class="mermaid">\n${escapeHtml(safeCode)}\n</pre>`;
  return `<pre><code class="language-${escapeHtml(lang)}">${escapeHtml(safeCode)}</code></pre>`;
};

marked.setOptions({ renderer, gfm: true, breaks: true });

export const parseMarkdown = (markdown) => marked.parse(markdown);
