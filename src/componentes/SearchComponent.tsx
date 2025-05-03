import { useRef, useState } from "react"

import './SearchComponent.css';

export function SearchComponent () {
    const [ search, setSearch ] = useState();
    const [ results, setResults ] = useState([134, 321321, 132121]);
    const [ position, setPosition ] = useState( {top: 0, left: 0, width: 0} );
    const [ isShowResults, setIsShowResults ] = useState(false);

    const updatePosition = (e) => {
        const rect = e.target.getBoundingClientRect();
        setPosition({
            top: rect.bottom,
            left: rect.left,
            width: rect.width,
        });

        console.log(position);
    };

    return (
        <>
            <input
                className='component-search form-control'
                type="text"
                placeholder='Pesquisar'
                onFocus={(e) => updatePosition(e)} />
            { isShowResults &&
                <div 
                    className="component-search-results"
                    style={{
                        top: position.top,
                        left: position.left,
                        width: position.width,
                }}>
                    {results.map((res, idx) => (
                    <div key={idx}>{res}</div>
                    ))}
                </div>
            }
        </>
    );
}