import { useState } from "react";
import { ItemMenu } from "../models";

import './OpcoesComponent.css';

interface Props {
    icon: string,
    menu: ItemMenu[]
}

export function OpcoesComponent ( { icon, menu }: Props) {
    const [ isExibindoMenu, setIsExibindoMenu ] = useState(false);


    return (
        <div className="component-opcoes">
            <img src={icon} onClick={() => setIsExibindoMenu(!isExibindoMenu)} />

            <div className="component-opcoes-container" style={{
                display: isExibindoMenu? '': 'none'
            }}>
                {menu.map((itemMenu, idx) => {
                    return (
                        <span
                            className="component-opcoes-item"
                            onClick={ () => itemMenu.onClick() }
                        >{itemMenu.menu}</span>
                    );
                })}
            </div>
        </div>
    );
}