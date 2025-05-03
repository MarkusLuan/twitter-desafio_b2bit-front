import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { Feed } from "../models";
import { ApiService, LoginService } from "../services";
import { FeedComponent, LoadingComponent, UserComponent, OpcoesComponent, SearchComponent } from "../componentes";

import iconAdd from "../assets/iconAdd.png";
import iconOpcoesSeta from "../assets/iconOpcoesSeta.png";
import "./Home.css";

export function Home() {
    const [ feeds, setFeed ] = useState<Feed[]>([]);
    const [ isCarregando, setIsCarregando ] = useState(false);
    
    const navigate = useNavigate();
    const apiService = new ApiService();
    const loginService = new LoginService();

    const postar = () => {
        navigate("/feed/create");
    };

    const updateFeed = () => {
        setIsCarregando(true);

        const res = apiService.getFeed(loginService.userToken!);

        res.then(r => {
            const res = r.data;
            const feeds = [];
            for (let r of res) {
                const feed = new Feed(
                    r["uuid"],
                    new Date(r["dt_criacao"]),
                    r["created_by"],
                    r["texto"],
                    r["count_likes"],
                    r["is_liked"]
                );

                feeds.push(feed);
            }
            
            setFeed(feeds);
        }).catch(r => {
        }).finally(() => {
            setIsCarregando(false);
        });
    };

    useEffect(() => {
        updateFeed();
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

            <div id="feedlist_container">
                {feeds.map((feed, idx) => (
                    <FeedComponent key={idx} feed={feed} />
                ))}
            </div>

            <LoadingComponent id='feedlist_loading' isCarregando={isCarregando} />
        </div>
    );
}