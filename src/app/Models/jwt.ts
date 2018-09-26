export class JWT {
    token: string;
    expires: Date;
    userName: string;

    constructor(token: string = "") {
        this.token = token;
    }
}