import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { Feed } from "../models";
import { ApiService, LoginService } from "../services";
import { FeedComponent, LoadingComponent } from "../componentes";

export function Home() {
    const [ feeds, setFeed ] = useState<Feed[]>([]);
    const [ isCarregando, setIsCarregando ] = useState(false);
    
    const navigate = useNavigate();
    const apiService = new ApiService();
    const loginService = new LoginService();

    const postar = () => {
        navigate("/post/create");
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

    return (
        <div >
            {feeds.map((feed, idx) => (
                <FeedComponent key={idx} feed={feed} />
            ))}

            <LoadingComponent isCarregando={isCarregando} />

            <button
                type='button'
                onClick={(e) => postar()}
            >Postar</button>
        </div>
    );
}