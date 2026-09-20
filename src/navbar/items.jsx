import React from "react";

export default function NavBarItem(props){
    const handleClick = (event) => {
        if (!props.href) {
            event.preventDefault();
        }

        props.onClick?.(event);
    };

    return (
        <li className="nav-item" onClick={handleClick}>
            <a
                href={props.href || "#"}
                className="nav-link"
                target={props.blank === "true" ? "_blank" : ""}
                role={props.href ? undefined : "button"}
                aria-pressed={props["aria-pressed"]}
                aria-label={props["aria-label"]}
            >
                <div className="triangle-right"></div>
                <i className={ props.icon + " fas nav-icon" }></i>
                {props.description}
            </a>
        </li>
    )
}
