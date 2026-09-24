import React from "react";
import ContentSection from "../layout/ContentSection";
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
                        <div className="profile-image home-profile-image">
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
                    <button type="button" className="learning-path" onClick={() => choosePath("systems")}>
                        <i className="fas fa-tools" aria-hidden="true" />
                        <span>Resolver problemas reales en sistemas</span>
                        <small>Observabilidad, planificación y prácticas para el trabajo cotidiano.</small>
                    </button>
                    <button type="button" className="learning-path" onClick={() => choosePath("thinking")}>
                        <i className="fas fa-sitemap" aria-hidden="true" />
                        <span>Pensar mejor: arquitectura, diseño y decisiones</span>
                        <small>Abstracciones, código mantenible y documentación que ayuda.</small>
                    </button>
                    <button type="button" className="learning-path" onClick={() => choosePath("career")}>
                        <i className="fas fa-seedling" aria-hidden="true" />
                        <span>Crecer profesionalmente</span>
                        <small>Experiencia, comunicación y aprendizajes de una carrera en tecnología.</small>
                    </button>
                </div>
            </div>
        </ContentSection>
    )
}
