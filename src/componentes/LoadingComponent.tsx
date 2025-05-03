import { CSSProperties } from "react"

interface Props {
    isCarregando: boolean,
    className?: string,
    style?: CSSProperties,
    id?: string
}

export function LoadingComponent (props: Props) {
    const className = `component-loading spinner-border text-primary ${props.className? props.className : ''}`;

    return (
        <>
            { props.isCarregando &&
                <div id={props.id} className={className} role="status" style={props.style}>
                    <span className="visually-hidden">Carregando...</span>
                </div>
            }
        </>
    );
}