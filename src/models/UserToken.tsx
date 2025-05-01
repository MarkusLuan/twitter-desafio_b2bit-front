export class UserToken {
    token: string;
    refreshToken: string;
    createdAt: number;
    expiresIn: number;

    constructor (token: string, refreshToken: string, createdAt: number, expiresIn: number) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.createdAt = createdAt;
        this.expiresIn = expiresIn;
    }

    isExpirado () {
        const agora = new Date();
        const dtExpiracao = new Date(this.expiresIn);

        return (agora >= dtExpiracao);
    }
}