import tableContent from "../tablecontent.json";
import { parseMarkdown } from "../lib/markdown";

async function importMarkdownByID(id) {
    const article = tableContent.find((item) => item.id === id);
    if (!article) throw new Error(`No se encontró artículo con ID: ${id}`);

    const response = await fetch(`/articules/${article.file}`);
    if (!response.ok) throw new Error(`No se pudo cargar ${article.file} (${response.status})`);

    return { ...article, content: parseMarkdown(await response.text()) };
}

export default { importMarkdownByID }
