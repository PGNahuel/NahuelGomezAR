import React, { useEffect, useRef, useState } from "react";
import NavBarItem from "./items";
import t from "./../resources/translate";

export default function Navigator({ Unload }) {
    const sidebarRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const [theme, setTheme] = useState(() => {
        const savedTheme = window.localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        const closeMenuOnOutsidePress = (event) => {
            const togglerIsVisible = window.matchMedia("(max-width: 991px)").matches;

            if (isMenuOpen && togglerIsVisible && !sidebarRef.current?.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeMenuOnOutsidePress);
        return () => document.removeEventListener("pointerdown", closeMenuOnOutsidePress);
    }, [isMenuOpen]);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");
    };

    const isDarkTheme = theme === "dark";

    return (
        <div id="tm-sidebar" ref={sidebarRef} className={`tm-sidebar${isMenuOpen ? " show" : ""}`}>
            <nav className="tm-nav">
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div>
                    <div className="tm-brand-box">
                        <h1 className="tm-brand">PG Nahuel</h1>
                    </div>
                    <ul id="tm-main-nav">
                        <NavBarItem description={t("MAIN_CONTENT")} icon="fa-home" href="#home" onClick={() => Unload("#home")} />
                        <NavBarItem description={t("ARTICLES")} icon="fa-user-friends" href="#articles" onClick={() => Unload("#articles")} />
                        <NavBarItem description={t("CONTACT")} icon="fa-envelope" href="#contact" onClick={() => Unload("#contact")} />
                        <NavBarItem description={t("CV")} icon="fa-file-pdf" blank="true" href="/CV_Nahuel_Gomez_Senior_Backend_Engineer.pdf" onClick={() => {}} />
                        <NavBarItem description="Modo" icon={isDarkTheme ? "fa-sun" : "fa-moon"} onClick={toggleTheme}
                        aria-pressed={isDarkTheme}
                        aria-label={isDarkTheme ? "Activar modo claro" : "Activar modo oscuro"}/>
                    </ul>
                </div>
                <div className="social-links">
                    <a target="_blank" href="https://x.com/NachoPNG" className="tm-social-link"><i className="fab fa-twitter"></i></a>
                    <a target="_blank" href="https://www.linkedin.com/in/pgnahuel" className="tm-social-link"><i className="fab fa-linkedin"></i></a>
                    <a target="_blank" href="https://www.ivoox.com/escuchar-audios-nahuel-gomez_al_15792872_1.html" className="tm-social-link"><i className="fa fa-podcast"></i></a>
                    <a target="_blank" href="https://github.com/pgnahuel" className="tm-social-link"><i className="fab fa-github"></i></a>
                </div>
            </nav>

        </div>

    )
};
