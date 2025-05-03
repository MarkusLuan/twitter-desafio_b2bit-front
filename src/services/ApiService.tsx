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

    async getAuthInfo(userToken: UserToken) {
        return await this.request.get(`/auth/info`, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
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

    async searchUser(userToken: UserToken, search: string) {
        return await this.request.get(`/users/?search=${search}&max_results=5`, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
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

    async getFeedInfo(userToken: UserToken, uuidFeed: string) {
        return await this.request.get(`/feed/${uuidFeed}`, {
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

    async editarFeed(userToken: UserToken, uuidFeed: string, feedTexto: string) {
        return await this.request.put(`/feed/${uuidFeed}`, {
            "texto": feedTexto,
        }, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async deletarFeed(userToken: UserToken, uuidFeed: string) {
        return await this.request.delete(`/feed/${uuidFeed}`, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async curtirFeed(userToken: UserToken, uuidFeed: string) {
        return await this.request.post(`/likes/${uuidFeed}`, {}, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async descurtirFeed(userToken: UserToken, uuidFeed: string) {
        return await this.request.delete(`/likes/${uuidFeed}`, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async follow(userToken: UserToken, uuidUser: string) {
        return await this.request.post(`/followers/${uuidUser}`, {}, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }

    async unfollow(userToken: UserToken, uuidUser: string) {
        return await this.request.delete(`/followers/${uuidUser}`, {
            headers: {
                Authorization: `Bearer ${userToken.token}`
            }
        });
    }
};