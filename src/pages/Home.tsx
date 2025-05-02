import { ReactEventHandler, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { ApiService } from "../services/ApiService";
import { LoginService  } from "../services/LoginService";

import { FeedComponent } from "../componentes/FeedComponent";
import { LoadingComponent } from "../componentes/LoadingComponent";

import { Feed  } from "../models/Feed";

import "./Home.css";
import '../App.css'

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
                    r["dt_criacao"],
                    r["created_by"],
                    r["texto"],
                    r["count_likes"]
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