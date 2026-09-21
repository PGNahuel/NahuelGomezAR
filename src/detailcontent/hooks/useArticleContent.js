import { useEffect, useState } from "react";
import importer from "../../listproject/ImporterMD";

const initialContent = {
    Cargando: true,
    Title: "",
    Content: "",
    Img: "default.webp",
    Tags: []
};

function formatArticle(article) {
    return {
        Img: article.img,
        Title: article.title,
        Content: article.content,
        Id: article.id,
        Author: article.author,
        Tags: article.tags || []
    };
}

export default function useArticleContent(Id, Articulo) {
    const [contenido, setContenido] = useState(initialContent);

    useEffect(() => {
        let isCurrent = true;

        if (Articulo) {
            setContenido({ ...Articulo, Cargando: false });
            return () => {
                isCurrent = false;
            };
        }

        setContenido(initialContent);

        importer.importMarkdownByID(Id)
            .then((article) => {
                if (!isCurrent) return;

                const formattedArticle = formatArticle(article);
                window.document.title = `Nahuel Gómez | ${formattedArticle.Title}`;
                window.history.replaceState(null, formattedArticle.Title, `/?id=${formattedArticle.Id}`);
                setContenido({ ...formattedArticle, Cargando: false });
            })
            .catch((error) => {
                if (!isCurrent) return;

                console.error("No se pudo cargar el artículo:", error);
                setContenido({
                    Cargando: false,
                    Error: true,
                    Title: "Error al cargar",
                    Content: "No se pudo cargar el artículo solicitado",
                    Tags: []
                });
            });

        return () => {
            isCurrent = false;
        };
    }, [Id, Articulo]);

    return contenido;
}
