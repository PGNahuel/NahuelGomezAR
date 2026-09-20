import React, { useEffect, useState } from "react";
import NavBarItem from "./items";
import t from "./../resources/translate";

export default function Navigator({ Unload }) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = window.localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(()=>{
        const navbarToggler = document.querySelector(".navbar-toggler");
        const newNavbarToggler = navbarToggler.cloneNode(true);
        navbarToggler.parentNode.replaceChild(newNavbarToggler, navbarToggler);

        newNavbarToggler.addEventListener("click", function(e) {
            document.querySelector(".tm-sidebar").classList.toggle("show");
            e.stopPropagation();
        });
    },[]);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");
    };

    const isDarkTheme = theme === "dark";

    return (
        <div id="tm-sidebar" className="tm-sidebar">
            <nav className="tm-nav">
                <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
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