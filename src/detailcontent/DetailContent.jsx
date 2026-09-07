import React, { useEffect, useState } from "react";
import importer from "../listproject/ImporterMD";
import mermaid from 'mermaid';

export default function DetailContent({ Id, Articulo, Volver }) {
    const [contenido, setContenido] = useState({
        Cargando: true,
        Title: "",
        Content: "",
        Img: "default.webp"
    });

    useEffect(() => {
        mermaid.initialize({ startOnLoad: false });
        
        if (!Articulo) {
            importer.importMarkdownByID(Id)
                .then((articulo) => {
                    const articuloFormatted = {
                        Img: articulo.img,
                        Title: articulo.title,
                        Content: articulo.content,
                        Id: articulo.id,
                        Author: articulo.author
                    }

                    window.document.title = "Nahuel Gómez | " + articuloFormatted.Title;
                    window.history.replaceState(null, articuloFormatted.Title, "/?id=" + articuloFormatted.Id);

                    setContenido({
                        ...articuloFormatted,
                        Cargando: false
                    });
                    
                    setTimeout(() => {
                        mermaid.run({
                            nodes: [...document.getElementsByClassName("mermaid")],
                        });
                    }, 100);
                })
                .catch((c) => {
                    console.log(c);
                    setContenido({
                        Cargando: false,
                        Error: true,
                        Title: "Error al cargar",
                        Content: "No se pudo cargar el artículo solicitado"
                    });
                });
        } else {
            setContenido({
                ...Articulo,
                Cargando: false
            });
            
            setTimeout(() => {
                mermaid.run({
                    nodes: [...document.getElementsByClassName("mermaid")],
                });
            }, 100);
        }
    }, [Id, Articulo]); 

    if (contenido.Cargando) {
        return (
            <div className="maincontent">
                Cargando...
            </div>
        );
    } else {
        return (
            <div className="maincontent">
                <div className="banner">
                    <img 
                        className="contentbanner" 
                        src={"/img/img-" + contenido.Img} 
                        alt={contenido.Title}
                    />
                </div>
                <div>
                    <h2 className="tm-text-primary" id="articles">{contenido.Title}</h2>
                    <hr className="mb-5" />
                    <div 
                        className="detail-content" 
                        dangerouslySetInnerHTML={{ __html: contenido.Content }} 
                    />
                </div>
                <div className="footer">
                    {(() => {
                        const baseUrl = window.location.origin + window.location.pathname + '?id=' + encodeURIComponent(contenido.Id || Id);
                        const text = `¡Mirá lo que publicó @NachoPNG! Estoy seguro que te va a interesar: ${baseUrl}`;
                        const tweetUrl =
                            'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
                        return (
                            <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="share-button">
                                Compartir en X
                            </a>
                        );
                    })()}

                    {(() => {
                        const baseUrl = window.location.origin + window.location.pathname + '?id=' + encodeURIComponent(contenido.Id || Id);
                        const linkedinUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(baseUrl);
                        return (
                            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="share-button">
                                Compartir en <span className="fab fa-linkedin"></span> LinkedIn
                            </a>
                        );
                    })()}
                </div>
                <span onClick={Volver} className="volverBtn btn">Volver</span>
            </div>
        );
    }
}