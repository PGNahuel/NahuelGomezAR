import React, { useRef } from "react";
import useStickyReadingProgress from "./hooks/useStickyReadingProgress";

export default function ReadingProgress({ progress, content }) {
    const wrapperRef = useRef(null);
    const widgetRef = useRef(null);
    const { isPinned, widgetHeight, widgetPosition } = useStickyReadingProgress(
        wrapperRef,
        widgetRef,
        content
    );

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            ref={wrapperRef}
            className={`reading-progress-wrapper${isPinned ? " is-pinned" : ""}`}
            style={isPinned ? { height: `${widgetHeight}px` } : undefined}
        >
            <aside
                ref={widgetRef}
                className="reading-progress"
                style={isPinned ? { left: `${widgetPosition.left}px`, width: `${widgetPosition.width}px` } : undefined}
                aria-label="Progreso de lectura"
            >
                <div className="reading-progress__header">
                    <div className="reading-progress__summary">
                        <span>Lectura</span>
                        <strong>{progress}%</strong>
                    </div>
                    <div className="reading-progress__actions">
                        <button
                            type="button"
                            className="reading-progress__top"
                            aria-label="Volver al inicio del artículo"
                            title="Volver al inicio"
                            onClick={scrollToTop}
                        >
                            ↑
                        </button>
                    </div>
                </div>

                <div
                    className="reading-progress__track"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={progress}
                    aria-label={`${progress}% leído`}
                >
                    <span className="reading-progress__bar" style={{ width: `${progress}%` }} />
                </div>
            </aside>
        </div>
    );
}
