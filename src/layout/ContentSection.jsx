import React from "react";

export default function ContentSection({ as = "section", className = "", children, ...props }) {
    return React.createElement(as, {
        className: `content-section ${className}`.trim(),
        ...props
    }, children);
}
