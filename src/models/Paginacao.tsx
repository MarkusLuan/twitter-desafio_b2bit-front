export class Paginacao {
    firstResult: number = 0;
    maxResults: number = 0;
    tsAfter: number = 0;
    tsBefore: number = 0;

    constructor (data?: {firstResult?: number, maxResults?: number, tsAfter?: number, tsBefore?: number}) {
        this.firstResult = data?.firstResult ?? 0;
        this.maxResults = data?.maxResults ?? 0;
        this.tsAfter = data?.tsAfter ?? 0;
        this.tsBefore = data?.tsBefore ?? 0;
    }

    get queryParams () {
        return Object.keys(this).map((k) => {
            const kLowerCase = k.replace(/([A-Z])/g, match => {
                return `_${match.toLowerCase()}`
            });

            return encodeURIComponent(kLowerCase) + '=' + encodeURIComponent(this[k]);
        }).join('&');
    }
}