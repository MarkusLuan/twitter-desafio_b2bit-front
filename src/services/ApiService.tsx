import axios, { AxiosInstance } from 'axios';

import { UserToken } from "../models/UserToken";

export class ApiService {
    private BASIC_AUTH;
    private request: AxiosInstance;

    constructor () {
        const baseUrl = import.meta.env.VITE_API_URL;
        const authUser = import.meta.env.VITE_API_AUTH_USERNAME;
        const authPassword = import.meta.env.VITE_API_AUTH_PASSWORD;

        this.BASIC_AUTH = btoa(`${authUser}:${authPassword}`);

        this.request = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    async autenticar(user: string, senha: string) {
        return await this.request.post("/auth/token", {
            "username": user,
            "senha": senha,
        }, {
            headers: {
                Authorization: `Basic ${this.BASIC_AUTH}`
            }
        });
    }

    async cadastrarUsuario(nome: string, usuario: string, dt_nascimento: string, email: string, bio: string, senha: string) {
        return await this.request.post("/users/", {
            "nome": nome,
            "nick": usuario,
            "dt_nascimento": dt_nascimento,
            "email": email,
            "bio": bio,
            "senha": senha
        }, {
            headers: {
                Authorization: `Basic ${this.BASIC_AUTH}`
            }
        });
    }

    async getFeed(userToken: UserToken) {
        return await this.request.get("/feed/", {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async postarFeed(userToken: UserToken, feedTexto: string) {
        return await this.request.post("/feed/", {
            "texto": feedTexto,
        }, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async deletarFeed(userToken: UserToken, uuid_feed: string) {
        return await this.request.delete(`/feed/${uuid_feed}`, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async curtirFeed(userToken: UserToken, uuid_feed: string) {
        return await this.request.post(`/likes/${uuid_feed}`, {}, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async descurtirFeed(userToken: UserToken, uuid_feed: string) {
        return await this.request.delete(`/likes/${uuid_feed}`, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async unfollow(arg0: UserToken, createdBy: string) {
        throw new Error("Method not implemented.");
    }
};