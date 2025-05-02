import {UserComponent} from "./UserComponent";

import { Feed } from "../models/Feed";

import "./FeedComponent.css";

interface Props {
    feed: Feed
}

export function FeedComponent ({feed}: Props) {

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
                    <span style={{}}>❤️</span>
                    <strong>{feed.countLikes} curtidas</strong>
                </div>
                <div className="post-info">
                    <UserComponent nick={feed.createdBy} />
                    <p className="post-description">{feed.texto}</p>
                </div>
            </div>
        </div>
    );
}