import { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { Feed, Paginacao } from "../models";
import { ApiService, LoginService } from "../services";
import { FeedComponent, LoadingComponent, UserComponent, OpcoesComponent, SearchComponent } from "../componentes";

import iconAdd from "../assets/iconAdd.png";
import iconOpcoesSeta from "../assets/iconOpcoesSeta.png";
import "./Home.css";

export function Home() {
    const [ feeds, setFeed ] = useState<Feed[]>([]);
    const [ isCarregando, setIsCarregando ] = useState(false);

    const isLoadedOnce = useRef(false);
    const paginacao = new Paginacao({
        maxResults: 5
    });
    
    const navigate = useNavigate();
    const apiService = new ApiService();
    const loginService = new LoginService();

    const postar = () => {
        navigate("/feed/create");
    };

    const updateFeed = () => {
        setIsCarregando(true);

        console.log("teste 1");

        const res = apiService.getFeed(loginService.userToken!, paginacao);
        res.then(r => {
            const newFeeds: Feed[] = [];
            const res = r.data;

            console.log("teste 2");

            let tsMax = 0;
            let tsMin = new Date().getTime();
            for (let r of res) {
                const feed = new Feed(
                    r["uuid"],
                    new Date(r["dt_criacao"]),
                    r["created_by"],
                    r["texto"],
                    r["count_likes"],
                    r["is_liked"],
                    r["has_image"]
                );

                // Atualiza paginação
                const feedTs = parseInt((feed.dtCriacao.getTime() / 1000).toString())+1;
                tsMax = Math.max(tsMax, feedTs);
                tsMin = Math.min(tsMin, feedTs);

                newFeeds.push(feed);
            }

            paginacao.tsAfter = Math.max(paginacao.tsAfter, tsMax);
            paginacao.tsBefore = 0;

            console.table(paginacao);

            setFeed(prevFeeds => [...prevFeeds, ...newFeeds].sort((a, b) => {
                if (a.dtCriacao >= b.dtCriacao) return -1;
                return 1;
            }));
        }).catch(r => {
            if (r.status == 401) {
                navigate("/login");
                return;
            }
            console.error(r);
        }).finally(() => {
            setIsCarregando(false);
        });
    };

    useEffect(() => {
        if (isLoadedOnce.current) return;
        isLoadedOnce.current = true;

        // Atualiza o feed a cada 10 segundos
        // Não consegui fazer com que ele fosse atualizado dinamicamente ao rolar a pagina
        // odeio React kkkk

        updateFeed();
        setInterval(() => updateFeed(), 10 * 1000);
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = "#3A3A3A";
    
        return () => {
          // Limpa quando sair da página
          document.body.style.backgroundColor = "";
        };
      }, []);

    const menu = [{
        menu: "Sair",
        onClick: () => {
            loginService.encerrarSessao();
            navigate("/login");
        }
    }]

    return (
        <div id="feedlist">
            <div id="feedlist_header">
                <img id='bt_postarFeed' 
                    alt='Postar'
                    title='Postar'
                    src={iconAdd}
                    onClick={(e) => postar()} />
                
                <SearchComponent />

                <div className='d-flex'>
                    <UserComponent nick={loginService.getNick() || ''} />
                    <OpcoesComponent icon={iconOpcoesSeta} menu={menu} />
                </div>
            </div>

            <div id="feedlist_container" >
                {feeds.map((feed, idx) => (
                    <FeedComponent key={idx} feed={feed} />
                ))}
            </div>

            <LoadingComponent id='feedlist_loading' isCarregando={isCarregando} />
        </div>
    );
}