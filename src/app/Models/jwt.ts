export class JWT {
    token: string;
    expires: string;
    userName: string;

    constructor(token: string = "") {
        this.token = token;
    }
}