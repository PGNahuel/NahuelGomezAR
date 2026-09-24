import React from "react";

/**
 * Contenedor de contenido independiente del template visual anterior.
 * Mantiene un ancho de lectura cómodo junto a la navegación lateral y se adapta
 * sin depender de fondos posicionados de forma absoluta.
 */
export default function ContentSection({ as = "section", className = "", children, ...props }) {
    return React.createElement(as, {
        className: `content-section ${className}`.trim(),
        ...props
    }, children);
}
