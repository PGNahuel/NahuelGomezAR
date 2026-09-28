import React, { useEffect, useMemo, useRef, useState } from "react";
import promotions from "./articlePromotions.json";

function pickPromotion() {
    const enabledPromotions = promotions.filter(({ disabled }) => !disabled);
    const totalWeight = enabledPromotions.reduce((total, { weight }) => total + Math.max(0, weight), 0);
    if (!enabledPromotions.length) return null;
    if (!totalWeight) return enabledPromotions[0];

    const random = Math.random() * totalWeight;
    let accumulatedWeight = 0;

    return enabledPromotions.find(({ weight }) => {
        accumulatedWeight += Math.max(0, weight);
        return random < accumulatedWeight;
    }) || enabledPromotions[enabledPromotions.length - 1];
}

export default function ArticlePromoBanner({ articleId }) {
    const promotion = useMemo(pickPromotion, [articleId]);

    if (!promotion) return null;

    return <PromoBanner articleId={articleId} promotion={promotion} />;
}

function PromoBanner({ articleId, promotion }) {
    const [isVisible, setIsVisible] = useState(true);
    const timerRef = useRef(null);
    const timerStartedRef = useRef(false);

    useEffect(() => {
        setIsVisible(true);
        timerStartedRef.current = false;
        clearTimeout(timerRef.current);

        const startTimer = () => {
            if (timerStartedRef.current) return;

            timerStartedRef.current = true;
            timerRef.current = window.setTimeout(() => setIsVisible(false), 15000);
            window.removeEventListener("scroll", startTimer);
        };

        window.addEventListener("scroll", startTimer, { passive: true });
        return () => {
            window.removeEventListener("scroll", startTimer);
            clearTimeout(timerRef.current);
        };
    }, [articleId]);

    const restore = () => {
        timerStartedRef.current = true;
        clearTimeout(timerRef.current);
        setIsVisible(true);
    };

    if (!isVisible) {
        return <button type="button" className="promo-banner__restore" onClick={restore}>Mostrar destacado</button>;
    }

    return (
        <aside className="promo-banner" aria-label="Contenido destacado" style={{ "--promo-image": `url(${promotion.image})` }}>
            <a
                className="promo-banner__link"
                href={promotion.url}
                {...(promotion.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`Abrir: ${promotion.title}`}
            >
                <span className="promo-banner__label">DESTACADO</span>
                <span>
                    <strong>{promotion.title}</strong>
                    <span className="promo-banner__description">{promotion.description}</span>
                </span>
            </a>
            <button type="button" className="promo-banner__close" onClick={() => setIsVisible(false)} aria-label="Ocultar contenido destacado">×</button>
        </aside>
    );
}
