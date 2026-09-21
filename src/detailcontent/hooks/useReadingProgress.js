import { useEffect, useState } from "react";

export default function useReadingProgress(contentRef, isLoading, content) {
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        const article = contentRef.current;
        if (!article || isLoading) return undefined;

        let animationFrame;
        const updateReadingStatus = () => {
            const top = article.getBoundingClientRect().top + window.scrollY;
            const documentHeight = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );
            const maxScroll = Math.max(documentHeight - window.innerHeight, 0);
            const readableDistance = Math.max(maxScroll - top, 1);
            const nextProgress = Math.round(
                Math.min(100, Math.max(0, ((window.scrollY - top) / readableDistance) * 100))
            );

            setReadingProgress((currentProgress) => (
                currentProgress === nextProgress ? currentProgress : nextProgress
            ));
        };

        const requestUpdate = () => {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(updateReadingStatus);
        };

        requestUpdate();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        const resizeObserver = new ResizeObserver(requestUpdate);
        resizeObserver.observe(article);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            resizeObserver.disconnect();
        };
    }, [contentRef, isLoading, content]);

    return readingProgress;
}
