import { useEffect } from "react";
import mermaid from "mermaid";

export default function useMermaidDiagrams(contentRef, isLoading, content) {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: false });
    }, []);

    useEffect(() => {
        const article = contentRef.current;
        if (!article || isLoading) return undefined;

        const timeoutId = window.setTimeout(() => {
            const diagrams = [...article.querySelectorAll(".mermaid:not([data-processed])")];

            if (diagrams.length === 0) return;

            mermaid.run({ nodes: diagrams }).catch((error) => {
                console.error("No se pudo renderizar el diagrama Mermaid:", error);
            });
        }, 100);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [contentRef, isLoading, content]);
}
