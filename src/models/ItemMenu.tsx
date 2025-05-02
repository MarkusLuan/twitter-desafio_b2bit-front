export class ItemMenu {
    menu: String;
    onClick: Function;

    constructor (menu: string, onClick: Function) {
        this.menu = menu;
        this.onClick = onClick;
    }
}