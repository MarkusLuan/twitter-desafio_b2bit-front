export class Feed {
    uuid: string = "";
    dtCriacao: Date = new Date();
    createdBy: string = '';
    texto: string = "";
    countLikes: number = 0;
    isLiked: boolean = false;
    hasImage: Boolean = false;

    constructor (uuid: string, dtCriacao: Date, createdBy: string, texto: string, countLikes: number = 0, isLiked: boolean = false, hasImage: boolean = false) {
        this.uuid = uuid;
        this.dtCriacao = dtCriacao;
        this.createdBy = createdBy;
        this.texto = texto;
        this.countLikes = countLikes;
        this.isLiked = isLiked;
        this.hasImage = hasImage;
    }
}