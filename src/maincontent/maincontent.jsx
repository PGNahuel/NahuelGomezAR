import React from "react";
import ContentSection from "../layout/ContentSection";
import { contentPaths } from "../contentPaths";
export default function MainContent({ onSelectPath }) {
    const scrollToArticles = () => {
        document.querySelector("#articles")?.scrollIntoView({ behavior: "smooth" });
    };

    const choosePath = (path) => {
        onSelectPath(path);
        window.setTimeout(scrollToArticles, 0);
    };

    const exploreArticles = (event) => {
        event.preventDefault();
        onSelectPath(null);
        scrollToArticles();
    };

    return (
        <ContentSection className="home-intro" aria-labelledby="home-title">
            <div className="home-content">
                <div className="home-copy">
                    <p className="home-eyebrow">Backend, sistemas y crecimiento profesional</p>
                    <h1 id="home-title">Aprendé a diseñar, construir y sostener mejores sistemas.</h1>
                    <p className="home-lead">Ideas prácticas para resolver problemas reales, tomar mejores decisiones técnicas y crecer como profesional mientras lo hacés.</p>
                    <a className="home-cta" href="#articles" onClick={exploreArticles}>Explorar los contenidos <i className="fas fa-arrow-down" aria-hidden="true" /></a>
                </div>
                <aside className="hero-visual" aria-label="Ilustración sobre trabajo y sistemas de software">
                    <div className="hero-visual-artwork">
                        <img src="/img/inews.webp" alt="Ilustración de una persona trabajando con diagramas de software" />
                    </div>
                    <span className="hero-visual-label">De la práctica a mejores decisiones</span>
                    <div className="hero-visual-meta">
                        <div className="home-profile-image">
                            <img src="/img/yo.webp" alt="Nahuel Gómez, autor del sitio" />
                        </div>
                        <p className="hero-author"><strong>Soy Nahuel, desarrollador backend.</strong> Comparto aprendizajes, ejemplos y soluciones que me sirvieron en la vida real.</p>
                    </div>
                </aside>
            </div>
            <div className="learning-paths" aria-labelledby="paths-title">
                <div className="paths-heading">
                    <p className="home-eyebrow">Elegí por dónde empezar</p>
                    <h2 id="paths-title">Tres caminos para recorrer el sitio</h2>
                </div>
                <div className="paths-grid">
                    {contentPaths.map((path) => (
                        <button type="button" className="learning-path" key={path.id} onClick={() => choosePath(path.id)}>
                            <i className={path.icon} aria-hidden="true" />
                            <span>{path.cardTitle}</span>
                            <small>{path.cardDescription}</small>
                        </button>
                    ))}
                </div>
            </div>
        </ContentSection>
    )
}
