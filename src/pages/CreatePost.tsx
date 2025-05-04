import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import { ApiService, LoginService } from "../services";
import { ErroComponent, LoadingComponent } from "../componentes";

export function CreatePost() {
    const { uuid_feed } = useParams<{ uuid_feed: string }>();
    const isEditando = uuid_feed != undefined;
    
    const [ feedTexto, setFeedTexto ] = useState('');
    
    const [ imgFile, setImgFile ] = useState<File | null>(null);
    const [ erro, setErro ] = useState('');
    const [ isCarregando, setIsCarregando ] = useState(false);
    const [ isPodePostar, setIsPodePostar ] = useState(false);

    const apiService = new ApiService();
    const loginService = new LoginService();
    const navigate = useNavigate();

    const salvarPostagem = () => {
        if (!isPodePostar) return;

        setIsCarregando(true);

        const formData = new FormData();
        if (imgFile) formData.append("img", imgFile!);
        formData.append("texto", feedTexto);

        if (isEditando) {
            let res = apiService.editarFeed(loginService.userToken!, uuid_feed, formData);
            res.then(() => {
                navigate("/");
            }).catch(() => {
                setErro("Erro: Não foi possivel realizar a postagem!");
            }).finally(() => {
                setIsCarregando(false);
            });
        } else {
            let res = apiService.postarFeed(loginService.userToken!, formData);
            res.then(() => {
                navigate("/");
            }).catch(() => {
                setErro("Erro: Não foi possivel realizar a postagem!");
            }).finally(() => {
                setIsCarregando(false);
            });
        }
    };

    const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) setImgFile(files[0]);
    };

    useEffect(() => {
        if (isEditando) {
            const res = apiService.getFeedInfo(loginService.userToken!, uuid_feed);
            res.then(r => {
                setFeedTexto(r.data.texto);
                setIsPodePostar(true);
            }).catch(() => {
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

            <input
                className="form-control mt-3"
                type="file"
                accept='image/*'
                onChange={ onImgChange } />
            
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