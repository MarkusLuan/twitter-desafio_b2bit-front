import { CSSProperties } from "react"

interface Props {
    isCarregando: boolean,
    className?: string,
    style?: CSSProperties
}

export function LoadingComponent (props: Props) {
    const className = `spinner-border text-primary ${props.className? props.className : ''}`;

    return (
        <>
            { props.isCarregando &&
                <div className={className} role="status" style={props.style}>
                    <span className="visually-hidden">Carregando...</span>
                </div>
            }
        </>
    );
}