import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ApiService } from "../services/ApiService";
import { LoginService  } from "../services/LoginService";
import { UserToken  } from "../models/UserToken";

import { ErroComponent } from "../componentes/ErroComponent";
import { LoadingComponent } from "../componentes/LoadingComponent";
import '../App.css'

export function CreatePost() {
    const [ feedTexto, setFeedTexto ] = useState('');
    
    const [ erro, setErro ] = useState('');
    const [ isCarregando, setIsCarregando ] = useState(false);

    const apiService = new ApiService();
    const loginService = new LoginService();
    const navigate = useNavigate();

    const salvarPostagem = () => {
        setIsCarregando(true);

        let res = apiService.postarFeed(loginService.userToken!, feedTexto);
        res.then(r => {
            navigate("/");
        }).catch(r => {
            setErro("Erro: Não foi possivel realizar a postagem!");
        }).finally(() => {
            setIsCarregando(false);
        });
    }

    return (
        <div style={{width: "70vw"}}>
            <label
                htmlFor="inpt_feed_texto"
                className="form-label"
                style={{ fontSize: "20pt" }}
            >Tá pensando o que Zé?</label>

            <textarea 
                id="inpt_feed_texto"
                className="form-control" 
                rows={5}
                value={feedTexto}
                onChange={ (e) => setFeedTexto(e.target.value) } />
            
            <button
                type="button"
                className='mt-3'
                style={{width: "100%"}}
                onClick={() => salvarPostagem()}
            >Postar</button>

            <LoadingComponent isCarregando={isCarregando} className='mt-4' />
            <ErroComponent erro={erro} />
        </div>
    );
}