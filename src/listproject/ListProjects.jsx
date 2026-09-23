import React, { useMemo, useState } from "react";
import t from "./../resources/translate";
import tableContent from "../tablecontent.json";

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

const PanelArticles = ({ Load }) => {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const normalizedQuery = normalizeText(query.trim());

    const articles = useMemo(() => tableContent
        .filter((article) => {
            if (!normalizedQuery) return true;
            const searchableContent = [article.title, article.author, ...(article.tags || [])].join(" ");
            return normalizeText(searchableContent).includes(normalizedQuery);
        }), [normalizedQuery]);
    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    const visibleArticles = articles.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);

    const updateQuery = (value) => {
        setQuery(value);
        setCurrentPage(1);
    };

    return (
        <div className="tm-section-wrap" id="articles">
            <div className="tm-parallax" data-parallax="scroll" data-image-src="img/brainstrom.webp" id="imgArticules" />
            <section className="tm-section" aria-labelledby="articles-title">
                <h2 id="articles-title" className="tm-text-primary">{t("ARTICLES")}</h2>
                <hr className="mb-5" />
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
        </div>
    );
};

export default PanelArticles;
