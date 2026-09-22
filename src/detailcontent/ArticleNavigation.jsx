import React, { useEffect, useState } from "react";

export default function ArticleNavigation({ headings, onOpenSiteNavigation }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        if (!headings.length) return undefined;

        const headingElements = headings
            .map(({ id }) => document.getElementById(id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleHeading = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

                if (visibleHeading) setActiveId(visibleHeading.target.id);
            },
            { rootMargin: "-15% 0px -70% 0px" }
        );

        headingElements.forEach((heading) => observer.observe(heading));
        return () => observer.disconnect();
    }, [headings]);

    const goToHeading = (event, id) => {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
        setIsOpen(false);
    };

    return (
        <aside className={`article-navigation${isOpen ? " show" : ""}`} aria-label="Índice del artículo">
            <button
                className="article-navigation__toggle"
                type="button"
                aria-label="Mostrar índice del artículo"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
            >
                <i className="fas fa-list" aria-hidden="true" />
            </button>
            <div className="article-navigation__content">
                <div className="article-navigation__header">
                    <h2>En este artículo</h2>
                    <button type="button" onClick={onOpenSiteNavigation}>
                        <i className="fas fa-bars" aria-hidden="true" /> Sitio
                    </button>
                </div>
                <nav>
                    <ol>
                        {headings.map(({ id, title, level }) => (
                            <li key={id} className={`article-navigation__level-${level}`}>
                                <a
                                    href={`#${id}`}
                                    className={activeId === id ? "is-active" : undefined}
                                    onClick={(event) => goToHeading(event, id)}
                                >
                                    {title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </aside>
    );
}
