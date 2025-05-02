export class Feed {
    uuid: string = "";
    dtCriacao: Date = new Date();
    createdBy: string = '';
    texto: string = "";
    imgSrc?: string | null = null;
    countLikes: number = 0;

    constructor (uuid: string, dtCriacao: Date, createdBy: string, texto: string, countLikes: number = 0, imgSrc: string | null=null) {
        this.uuid = uuid;
        this.dtCriacao = dtCriacao;
        this.createdBy = createdBy;
        this.texto = texto;
        this.countLikes = countLikes;
        this.imgSrc = imgSrc;
    }
}