export class UserModel {
    userName: string;
    password: string;
    salt: string;

    constructor(userName: string, password: string, salt: string = null) {
        this.userName = userName;
        this.password = password;
        this.salt = salt;
    }
}