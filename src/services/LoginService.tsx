import { UserToken } from "../models/UserToken";
import CryptoJS from "crypto-js";

export class LoginService {
    private criptoKey: string;

    constructor () {
        this.criptoKey = import.meta.env.VITE_CRIPTO_KEY;
    }
    
    public get isLogado () {
        return localStorage.getItem("nick") && localStorage.getItem("token") && (this.userToken != null && this.userToken!.isExpirado());
    }
    
    public get userToken() : UserToken|null {
        let criptoToken = localStorage.getItem("token");
        if (criptoToken == null) return null;

        const bytes = CryptoJS.AES.decrypt(criptoToken, this.criptoKey);
        const j = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const token = new UserToken(
            j["token"],
            j["refreshToken"],
            j["createdAt"],
            j["expiresIn"],
        );

        return token;
    }
    
    public salvarToken(userToken: UserToken) {
        const criptoToken = CryptoJS.AES.encrypt(
            JSON.stringify(userToken),
            this.criptoKey
        ).toString();

        localStorage.setItem("token", criptoToken);
    }

    public salvarNick(nick: string) {
        localStorage.setItem("nick", btoa(nick));
    }

    public getNick() {
        const nick = localStorage.getItem("nick");
        if (nick) return atob(nick);
        return null;
    }

    public encerrarSessao() {
        localStorage.clear();
    }
}