import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

import { UserComponent } from "../componentes";
import { ApiService, LoginService } from "../services";

import './SearchComponent.css';

interface UserDTO {
    nick: string,
    nome: string
}

export function SearchComponent () {
    const [ search, setSearch ] = useState('');
    const [ results, setResults ] = useState<UserDTO[]>([]);
    const [ position, setPosition ] = useState( {top: 0, left: 0, width: 0} );
    const [ isShowResults, setIsShowResults ] = useState(false);
    
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const navigate = useNavigate();
    const apiService = new ApiService();
    const loginService = new LoginService();

    const updatePosition = (e) => {
        const rect = e.target.getBoundingClientRect();
        setPosition({
            top: rect.bottom,
            left: rect.left,
            width: rect.width,
        });
    };

    const pesquisar = (search) => {
        const res = apiService.searchUser(loginService.userToken!, search);
        res.then(r => {
            const res = r.data;
            const usuarios = [];

            for (let r of res) {
                usuarios.push({
                    nick: r.nick,
                    nome: r.nome,
                })
            }
            
            setResults(usuarios);
            setIsShowResults(true);
        });
    }

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (value.trim().length > 0) pesquisar(value);
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

    const onResultSelect = (res: UserDTO) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        setIsShowResults(false);
        navigate(`/users/${res.nick}`);
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
                            className="component-search-itemResult"
                            onClick={() => onResultSelect(res)}
                        >
                            <UserComponent nick={res.nick} />
                            <span>{res.nome}</span>
                        </div>
                    ))}
                </div>
            }
        </>
    );
}