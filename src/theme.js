export function getPreferredTheme() {
    if (typeof window === "undefined") return "light";

    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getActiveTheme() {
    if (typeof document !== "undefined" && document.documentElement.dataset.theme === "dark") {
        return "dark";
    }

    return getPreferredTheme();
}
