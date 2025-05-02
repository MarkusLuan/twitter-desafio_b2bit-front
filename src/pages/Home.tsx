import { ReactEventHandler, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { ApiService } from "../services/ApiService";
import { LoginService  } from "../services/LoginService";
import { UserToken  } from "../models/UserToken";
import '../App.css'

export function Home() {
    const navigate = useNavigate();

    const postar = () => {
        navigate("/post/create");
    };

    return (
        <div>
            Teste

            <button
                type='button'
                onClick={(e) => postar()}
            >Postar</button>
        </div>
    );
}