import { useLayoutEffect } from "react";

const IOS_USER_AGENT = /iPad|iPhone|iPod/i;
const FIXED_LAYERS = [
    { selector: "#tm-sidebar", mode: "stretch" },
    { selector: ".tm-sidebar .navbar-toggler", mode: "inside-top" },
    { selector: ".article-navigation", mode: "stretch" },
    { selector: ".article-navigation__toggle", mode: "top" },
    { selector: ".volverBtn", mode: "bottom", bottom: 10 },
    { selector: ".promo-banner, .promo-banner__restore", mode: "bottom" },
    // It only becomes fixed after the reading widget is pinned.
    { selector: ".reading-progress-wrapper.is-pinned .reading-progress", mode: "top" },
];

function isIOS() {
    return IOS_USER_AGENT.test(navigator.userAgent)
        || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

/**
 * Replaces viewport-fixed UI with document-positioned UI on iOS.
 *
 * Safari can paint fixed layers incorrectly while its browser chrome or the
 * virtual keyboard changes size. Add ?ios-fixed-fallback=1 to test anywhere.
 */
export default function useIosFixedFallback() {
    useLayoutEffect(() => {
        const forced = new URLSearchParams(window.location.search).has("ios-fixed-fallback");
        if (!forced && !isIOS()) return undefined;

        const root = document.documentElement;
        let frameId = null;

        const getElements = () => FIXED_LAYERS.flatMap(({ selector, ...layer }) => (
            Array.from(document.querySelectorAll(selector), (element) => ({ element, ...layer }))
        ));
        const resizeObserver = typeof window.ResizeObserver === "undefined"
            ? null
            : new ResizeObserver(() => scheduleUpdate());

        root.classList.add("ios-fixed-fallback");

        const update = () => {
            frameId = null;
            const viewport = window.visualViewport;
            const viewportTop = window.scrollY + (viewport?.offsetTop || 0);
            const viewportHeight = viewport?.height || window.innerHeight;

            getElements().forEach(({ element, mode, top = 0, bottom = 0 }) => {
                const position = mode === "bottom"
                    ? viewportTop + viewportHeight - element.offsetHeight - bottom
                    // The parent fallback layer already tracks the viewport.
                    : mode === "inside-top" ? top : viewportTop + top;

                element.style.setProperty("--ios-fixed-top", `${Math.round(position)}px`);
                if (mode === "stretch") {
                    element.style.setProperty("--ios-fixed-height", `${Math.round(viewportHeight - top - bottom)}px`);
                }
                resizeObserver?.observe(element);
            });
        };

        const scheduleUpdate = () => {
            if (frameId === null) frameId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        window.visualViewport?.addEventListener("scroll", scheduleUpdate);
        window.visualViewport?.addEventListener("resize", scheduleUpdate);
        const mutationObserver = new MutationObserver(scheduleUpdate);
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            if (frameId !== null) window.cancelAnimationFrame(frameId);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            window.visualViewport?.removeEventListener("scroll", scheduleUpdate);
            window.visualViewport?.removeEventListener("resize", scheduleUpdate);
            mutationObserver.disconnect();
            resizeObserver?.disconnect();
            root.classList.remove("ios-fixed-fallback");
            getElements().forEach(({ element }) => {
                element.style.removeProperty("--ios-fixed-top");
                element.style.removeProperty("--ios-fixed-height");
            });
        };
    }, []);
}
