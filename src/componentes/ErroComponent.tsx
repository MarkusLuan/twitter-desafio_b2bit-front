import { useState } from "react"

interface Props {
    erro: string
}

export function ErroComponent (props: Props) {
    return (
        <>
            { props.erro &&
                <p className="mt-4 text-danger">{props.erro}</p>
            }
        </>
    );
}