import axios, { AxiosInstance } from 'axios';

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
};