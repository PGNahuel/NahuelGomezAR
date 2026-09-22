import React, { useMemo, useRef } from "react";
import ReadingProgress from "./ReadingProgress";
import useArticleContent from "./hooks/useArticleContent";
import useMermaidDiagrams from "./hooks/useMermaidDiagrams";
import useReadingProgress from "./hooks/useReadingProgress";
import useArticleTableOfContents from "./hooks/useArticleTableOfContents";
import ArticleNavigation from "./ArticleNavigation";

export default function DetailContent({ Id, Articulo, Volver, onOpenSiteNavigation }) {
    const articleContentRef = useRef(null);
    const contenido = useArticleContent(Id, Articulo);
    const articleMarkup = useMemo(
        () => ({ __html: contenido.Content }),
        [contenido.Content]
    );

    useMermaidDiagrams(articleContentRef, contenido.Cargando, contenido.Content);
    const readingProgress = useReadingProgress(
        articleContentRef,
        contenido.Cargando,
        contenido.Content
    );
    const headings = useArticleTableOfContents(
        articleContentRef,
        contenido.Cargando,
        contenido.Content
    );

    if (contenido.Cargando) {
        return <div className="maincontent">Cargando...</div>;
    }

    const articleUrl = `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(contenido.Id || Id)}`;
    const tweetText = `¡Mirá lo que publicó @NachoPNG! Estoy seguro que te va a interesar: ${articleUrl}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;

    return (
        <>
            <ArticleNavigation headings={headings} onOpenSiteNavigation={onOpenSiteNavigation} />
            <div className="maincontent">
                <div className="banner">
                <img
                    className="contentbanner"
                    src={`/img/img-${contenido.Img}`}
                    alt={contenido.Title}
                />
                </div>

                <ReadingProgress progress={readingProgress} content={contenido.Content} />

                <div className="principalcontent">
                <h2 className="tm-text-primary" id="articles">{contenido.Title}</h2>
                <hr className="mb-5" />
                <div
                    ref={articleContentRef}
                    className="detail-content"
                    dangerouslySetInnerHTML={articleMarkup}
                />
                </div>
                <div className="articuleTags">
                {contenido.Tags?.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
                </div>
                <div className="footer">
                <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="share-button">
                    Compartir en X
                </a>
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="share-button">
                    Compartir en <span className="fab fa-linkedin" /> LinkedIn
                </a>
                </div>
                <span onClick={Volver} className="volverBtn btn">Volver</span>
            </div>
        </>
    );
}
