import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Feed } from "../models/Feed";
import { ApiService, LoginService } from "../services";
import { UserComponent } from "./UserComponent";
import { OpcoesComponent } from "./OpcoesComponent";
import { ImageSkeletonComponent } from "./ImageSkeletonComponent";

import iconOpcoes from "../assets/iconOpcoes.png";
import "./FeedComponent.css";

interface Props {
    feed: Feed
}

export function FeedComponent ({ feed }: Props) {
    const [ countLikes, setCountLikes ] = useState(feed.countLikes);
    const [ isLiked, setIsLiked ] = useState(feed.isLiked);
    const [ isDeletado, setIsDeletado ] = useState(false);
    const [ imgSrc, setImgSrc ] = useState<string | null>(null);
    
    const apiService = new ApiService();
    const loginService = new LoginService();
    const navigate = useNavigate();

    const toggleCurtirFeed = () => {
        const updateCurtidas = (curtiu: boolean) => {
            setCountLikes (countLikes + (curtiu? 1 : -1));
            setIsLiked (curtiu);
        }

        if (isLiked) {
            const res = apiService.descurtirFeed(loginService.userToken!, feed.uuid);
            res.then(r => updateCurtidas(false))
               .catch(r => {
                    if (r.status == 404) updateCurtidas(false);
                }
            );
        } else {
            const res = apiService.curtirFeed(loginService.userToken!, feed.uuid);
            res.then(r => updateCurtidas(true));
        }
    }

    const dtFormatada = feed.dtCriacao.toLocaleDateString("pt-BR");
    const horaFormatada = feed.dtCriacao.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    let menu = [];
    let isFeedOwner = feed.createdBy == loginService.getNick();
    if (isFeedOwner) {
        menu = [
            {
                menu: "Editar",
                onClick: () => {
                    navigate(`/feed/edit/${feed.uuid}`);
                }
            },
            {
                menu: "Deletar",
                onClick: () => {
                    // TODO: Mostrar popup para confirmar
                    const res = apiService.deletarFeed(loginService.userToken!, feed.uuid);
                    res.then(r => { setIsDeletado(true) });
                }
            }
        ];
    } else {
        menu = [
            {
                // TODO: Remover após os testes
                menu: "Seguir usuário",
                onClick: () => {
                    apiService.follow(loginService.userToken!, feed.createdBy);
                }
            },
            {
                menu: "Deixar de Seguir",
                onClick: () => {
                    apiService.unfollow(loginService.userToken!, feed.createdBy);
                }
            }
        ]
    }

    useEffect(() => {
        if (feed.hasImage) {
            const res = apiService.getFeedImg(loginService.userToken!, feed.uuid);
            res.then(url => setImgSrc(url));
        }
    }, []);

    return (
        <>
            { !isDeletado &&
                <div>
                    <div className="feed">
                        <div className="d-flex feed-header">
                            <UserComponent nick={feed.createdBy} />
                            <OpcoesComponent icon={iconOpcoes} menu={menu} />
                        </div>
                        <div className="feed-imagem">
                            { feed.hasImage &&
                                !imgSrc && <ImageSkeletonComponent />
                                || imgSrc && <img src={ imgSrc } alt="Postagem" />
                            }
                        </div>
                        <div className="feed-acoes">
                            <span onClick={toggleCurtirFeed}>{ isLiked ? '❤️' : '🩶'}</span>
                            <strong>{countLikes} curtidas</strong>
                        </div>
                        <div className="feed-info">
                            <div className="d-flex">
                                <UserComponent nick={feed.createdBy} />
                                <div className="feed-datetime" >
                                    <span>{dtFormatada}</span>
                                    <span>{horaFormatada}</span>
                                </div>
                            </div>
                            <p className="feed-description">{feed.texto}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}