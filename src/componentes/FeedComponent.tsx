import { Feed } from "../models/Feed";
import { ApiService, LoginService } from "../services";
import { UserComponent } from "./UserComponent";

import "./FeedComponent.css";
import { useState } from "react";

interface Props {
    feed: Feed
}

export function FeedComponent ({ feed }: Props) {
    const apiService = new ApiService();
    const loginService = new LoginService();

    const [ countLikes, setCountLikes ] = useState(feed.countLikes);
    const [ isLiked, setisLiked ] = useState(feed.isLiked);

    const curtirFeed = () => {
        const res = apiService.curtirFeed(loginService.userToken!, feed.uuid);
        res.then(r => {
            setCountLikes (countLikes+1);
            setisLiked (!isLiked);
        }).catch(r => {});
    }

    return (
        <div>
            <div className="post">
                <div className="post-header">
                    <UserComponent nick={feed.createdBy} />
                </div>
                <div className="post-imagem">
                    <img src={feed.imgSrc || 'https://mkgcriacoes.com.br/imgs/logo_mkgcriacoes.png'} alt="Postagem" />
                </div>
                <div className="post-acoes">
                    <span onClick={curtirFeed}>{ isLiked ? '❤️' : '🩶'}</span>
                    <strong>{countLikes} curtidas</strong>
                </div>
                <div className="post-info">
                    <UserComponent nick={feed.createdBy} />
                    <p className="post-description">{feed.texto}</p>
                </div>
            </div>
        </div>
    );
}