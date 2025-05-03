import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import { ApiService, LoginService } from "../services";
import { ErroComponent, LoadingComponent } from "../componentes";

export function CreatePost() {
    const { uuid_feed } = useParams<{ uuid_feed: string }>();
    const isEditando = uuid_feed != undefined;

    const [ feedTexto, setFeedTexto ] = useState('');
    
    const [ erro, setErro ] = useState('');
    const [ isCarregando, setIsCarregando ] = useState(false);
    const [ isPodePostar, setIsPodePostar ] = useState(false);

    const apiService = new ApiService();
    const loginService = new LoginService();
    const navigate = useNavigate();

    const salvarPostagem = () => {
        if (!isPodePostar) return;

        setIsCarregando(true);

        if (isEditando) {
            let res = apiService.editarFeed(loginService.userToken!, uuid_feed, feedTexto);
            res.then(r => {
                navigate("/");
            }).catch(r => {
                setErro("Erro: Não foi possivel realizar a postagem!");
            }).finally(() => {
                setIsCarregando(false);
            });
        } else {
            let res = apiService.postarFeed(loginService.userToken!, feedTexto);
            res.then(r => {
                navigate("/");
            }).catch(r => {
                setErro("Erro: Não foi possivel realizar a postagem!");
            }).finally(() => {
                setIsCarregando(false);
            });
        }
    };

    useEffect(() => {
        if (isEditando) {
            const res = apiService.getFeedInfo(loginService.userToken!, uuid_feed);
            res.then(r => {
                setFeedTexto(r.data.texto);
                setIsPodePostar(true);
            }).catch(r => {
                setErro("Não é possível editar!\nAtualize a pagine e tente novamente!")
            });
        } else setIsPodePostar(true);
    }, []);

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
                disabled={!isPodePostar}
            >Postar</button>

            <LoadingComponent isCarregando={isCarregando} className='mt-4' />
            <ErroComponent erro={erro} />
        </div>
    );
}