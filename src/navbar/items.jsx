import React from "react";

export default function NavBarItem(props){
    return (
        <li className="nav-item" onClick={props.onClick}>                                
            <a href={props.href} className="nav-link"  
                target={props.blank === "true" ? "_blank" : ""}>
                <div className="triangle-right"></div>
                <i className={ props.icon + " fas nav-icon" }></i>
                {props.description}
            </a>
        </li>
    )
}

