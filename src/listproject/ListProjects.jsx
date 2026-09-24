import React, { useMemo, useState } from "react";
import t from "./../resources/translate";
import tableContent from "../tablecontent.json";
import ContentSection from "../layout/ContentSection";

const ARTICLES_PER_PAGE = 6;

const normalizeText = (value = "") => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();

const Article = ({ article, onClick }) => {
    const author = article.author || t("UNKNOW");
    const image = article.img || "articule.webp";
    return (
        <article className="news-card">
            <button type="button" className="news-card-button" onClick={onClick} aria-label={`Leer artículo: ${article.title}`}>
                <img src={`img/tm-${image}`} className="news-image" alt="" />
                <div className="news-content">
                    <h3 className="news-title">{article.title}</h3>
                    <p className="news-author">Por <span className="author-name">{author}</span></p>
                    {article.tags?.length > 0 && (
                        <div className="article-tags" aria-label="Temas del artículo">
                            <div className="article-tags-track">
                                {[false, true].map((isDuplicate) => (
                                    <ul className="article-tags-list" aria-hidden={isDuplicate} key={isDuplicate ? "duplicate" : "original"}>
                                        {article.tags.map((tag) => <li key={`${isDuplicate ? "copy-" : ""}${tag}`}>{tag}</li>)}
                                    </ul>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </button>
        </article>
    );
};

const paths = {
    systems: {
        title: "Resolver problemas reales en sistemas",
        description: "Observabilidad, planificación y prácticas para construir software que se pueda sostener.",
        articleIds: ["observability", "planification"]
    },
    thinking: {
        title: "Arquitectura, diseño y mejores decisiones",
        description: "Ideas para escribir, documentar y pensar sistemas más mantenibles.",
        articleIds: ["codificacion-documentacion", "pensar-abstracciones"]
    },
    career: {
        title: "Carrera, comunicación y experiencia",
        description: "Reflexiones personales sobre el recorrido profesional y lo que aprendemos al hacerlo.",
        articleIds: ["personal-experience", "mi-libro"]
    }
};

const PanelArticles = ({ Load, selectedPath, onClearPath }) => {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const normalizedQuery = normalizeText(query.trim());

    const activePath = selectedPath ? paths[selectedPath] : null;
    const articles = useMemo(() => tableContent
        .filter((article) => {
            if (activePath && !activePath.articleIds.includes(article.id)) return false;
            if (!normalizedQuery) return true;
            const searchableContent = [article.title, article.author, ...(article.tags || [])].join(" ");
            return normalizeText(searchableContent).includes(normalizedQuery);
        }), [normalizedQuery, activePath]);
    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    const visibleArticles = articles.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);

    const updateQuery = (value) => {
        setQuery(value);
        setCurrentPage(1);
    };

    return (
        <ContentSection as="div" id="articles">
            <section className="content-section__body" aria-labelledby="articles-title">
                <h2 id="articles-title" className="tm-text-primary">{t("ARTICLES")}</h2>
                <p className="articles-intro">{activePath ? activePath.description : "Una biblioteca de ideas y experiencias para mejorar cómo pensás, construís y sostenés software."}</p>
                <hr className="mb-5" />
                {activePath && <div className="active-path" role="status"><span><i className="fas fa-compass" aria-hidden="true" /> {activePath.title}</span><button type="button" onClick={onClearPath}>Ver todos los artículos</button></div>}
                <div className="articles-search">
                    <div className="articles-search-input">
                        <i className="fas fa-search" aria-hidden="true" />
                        <input id="article-search" type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Buscar por título, tema o autor" autoComplete="off" />
                        {query && <button type="button" onClick={() => updateQuery("")} aria-label="Limpiar búsqueda"><i className="fas fa-times" aria-hidden="true" /></button>}
                    </div>
                </div>
                {articles.length > 0 ? (
                    <>
                        <div className="news-container">
                            {visibleArticles.map((article) => <Article key={article.id} article={article} onClick={() => Load({ Id: article.id })} />)}
                        </div>
                        {totalPages > 1 && (
                            <nav className="article-pagination" aria-label="Paginación de artículos">
                                <button type="button" onClick={() => setCurrentPage((page) => page - 1)} disabled={currentPage === 1}>Anterior</button>
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                    <button type="button" key={page} onClick={() => setCurrentPage(page)} aria-current={page === currentPage ? "page" : undefined}>{page}</button>
                                ))}
                                <button type="button" onClick={() => setCurrentPage((page) => page + 1)} disabled={currentPage === totalPages}>Siguiente</button>
                            </nav>
                        )}
                    </>
                ) : <p className="articles-empty">No encontramos artículos para “{query}”. Probá con otro término o tema.</p>}
            </section>
        </ContentSection>
    );
};

export default PanelArticles;
