import { useEffect, useState } from "react";

function slugify(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "seccion";
}

export default function useArticleTableOfContents(contentRef, isLoading, content) {
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        const article = contentRef.current;
        if (!article || isLoading) {
            setHeadings([]);
            return undefined;
        }

        const usedIds = new Map();
        const nextHeadings = Array.from(article.querySelectorAll("h1, h2, h3, h4, h5, h6"))
            .map((heading) => {
                const title = heading.textContent.trim();
                if (!title) return null;

                const baseId = slugify(title);
                const occurrence = usedIds.get(baseId) || 0;
                usedIds.set(baseId, occurrence + 1);
                const id = occurrence ? `${baseId}-${occurrence + 1}` : baseId;

                heading.id = id;
                heading.tabIndex = -1;

                return {
                    id,
                    title,
                    level: Number(heading.tagName.slice(1))
                };
            })
            .filter(Boolean);

        setHeadings(nextHeadings);

        const requestedId = decodeURIComponent(window.location.hash.slice(1));
        if (requestedId) {
            requestAnimationFrame(() => {
                document.getElementById(requestedId)?.scrollIntoView({ block: "start" });
            });
        }

        return undefined;
    }, [contentRef, isLoading, content]);

    return headings;
}
