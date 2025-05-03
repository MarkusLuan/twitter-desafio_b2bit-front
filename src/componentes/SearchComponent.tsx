import { useRef, useState } from "react"

import './SearchComponent.css';

export function SearchComponent () {
    const [ search, setSearch ] = useState('');
    const [ results, setResults ] = useState([134, 321321, 132121]);
    const [ position, setPosition ] = useState( {top: 0, left: 0, width: 0} );
    const [ isShowResults, setIsShowResults ] = useState(false);
    
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const updatePosition = (e) => {
        const rect = e.target.getBoundingClientRect();
        setPosition({
            top: rect.bottom,
            left: rect.left,
            width: rect.width,
        });

        console.log(position);
    };

    const pesquisar = () => {
        setResults([Math.random() * 200]);
        setIsShowResults(true);
    }

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (value.trim().length > 0) pesquisar();
            else {
                setResults([]);
                setIsShowResults(false);
            }
        }, 500);
    }

    const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode == 27) {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            setIsShowResults(false);
        }
    };

    const onResultSelect = (res: any) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        console.log(res);

        setIsShowResults(false);
    };

    return (
        <>
            <input
                className='component-search form-control'
                type="text"
                placeholder='Pesquisar'
                value={search}
                onChange={onSearchChange}
                onKeyDown={onSearchKeyDown}
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
                        <div
                            key={idx}
                            onClick={() => onResultSelect(res)}
                        >{res}</div>
                    ))}
                </div>
            }
        </>
    );
}