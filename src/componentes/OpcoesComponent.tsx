import { useState } from "react";
import { ItemMenu } from "../models";

import './OpcoesComponent.css';

interface Props {
    icon: string,
    menu: ItemMenu[]
}

export function OpcoesComponent ( { icon, menu }: Props) {
    const [ isExibindoMenu, setIsExibindoMenu ] = useState(false);
    const [ position, setPosition ] = useState( {top: 0, left: 0, width: 0} );

    const updatePosition = (e) => {
        const rect = e.target.getBoundingClientRect();
        setPosition({
            top: rect.bottom,
            left: rect.left,
            width: rect.width,
        });
    };

    const onOpcoesClick = (e) => {
        updatePosition(e);
        setIsExibindoMenu(!isExibindoMenu);
    };

    return (
        <div className="component-opcoes">
            <img src={icon} onClick={ onOpcoesClick } />

            <div 
                className="component-opcoes-container"
                style={{
                    display: isExibindoMenu? '': 'none',
                    top: position.top,
                    left: position.left,
                    width: position.width,
                }}
            >
                {menu.map((itemMenu, idx) => {
                    return (
                        <span key={idx}
                            className="component-opcoes-item"
                            onClick={ () => itemMenu.onClick() }
                        >{itemMenu.menu}</span>
                    );
                })}
            </div>
        </div>
    );
}