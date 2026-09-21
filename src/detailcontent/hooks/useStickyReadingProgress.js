import { useEffect, useState } from "react";

export default function useStickyReadingProgress(wrapperRef, widgetRef, content) {
    const [isPinned, setIsPinned] = useState(false);
    const [widgetHeight, setWidgetHeight] = useState(0);
    const [widgetPosition, setWidgetPosition] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const widget = widgetRef.current;
        if (!wrapper || !widget) return undefined;

        const syncWidgetSize = () => {
            setWidgetHeight(widget.offsetHeight);
        };

        const syncWidgetPosition = () => {
            const { left, width } = wrapper.getBoundingClientRect();
            setWidgetPosition({ left, width });
        };

        const updatePinnedState = () => {
            const shouldPin = wrapper.getBoundingClientRect().top <= 0;
            setIsPinned((wasPinned) => {
                if (wasPinned === shouldPin) return wasPinned;

                if (shouldPin) syncWidgetPosition();
                return shouldPin;
            });
        };

        const handleResize = () => {
            syncWidgetSize();
            if (isPinned) syncWidgetPosition();
            updatePinnedState();
        };

        syncWidgetSize();
        updatePinnedState();
        window.addEventListener("scroll", updatePinnedState, { passive: true });
        window.addEventListener("resize", handleResize);
        const resizeObserver = new ResizeObserver(syncWidgetSize);
        resizeObserver.observe(widget);

        return () => {
            window.removeEventListener("scroll", updatePinnedState);
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
        };
    }, [content, isPinned, widgetRef, wrapperRef]);

    return { isPinned, widgetHeight, widgetPosition };
}
