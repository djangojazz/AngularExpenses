import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs"

import { environment  } from "../../environments/environment";
import { tap } from "rxjs/operators";
import { UserModel } from "../Models/userModel";
import { JWT } from "../Models/jwt";
import { Token } from "../../../node_modules/@angular/compiler";

@Injectable()
export class AuthService {
    private endpoint = `${environment.baseApi}/auth`;
    private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    private jwt: JWT = new JWT();
    public subTitle: string = "";

    constructor(private http: HttpClient) { }

    public getSalt(userName: string): Observable<string> {
        return this.http.get<string>(`${this.endpoint}/getSalt/${userName}`)
    }

    public generateSalt(user: UserModel) {
        this.http.post<JWT>(`${this.endpoint}/generateSalt`, user, { headers: this.headers});
    }

    public createAuthToken(user: UserModel): Observable<JWT> {
        return this.http.post<JWT>(`${this.endpoint}/createUserToken`, user, { headers: this.headers});
    }

    public checkExistingToken(user: UserModel): Boolean {
        var existingJWT = localStorage.getItem("jwt");
            if(existingJWT != null) {
                console.log(`jwt exists as ${existingJWT}`)
                var storageUserName = localStorage.getItem("userName");
                var storagePassword = localStorage.getItem("password");

                console.log(`${storageUserName} ${storagePassword}`)

                if(user.userName != storageUserName || user.password != storagePassword) {
                    console.log("Username or Password are wrong");
                    return false;
                }

                var data = this.decodeToken(existingJWT);
                    console.log("Got into decode Token");    
                    this.jwt.token = existingJWT;
                    var dt = new Date(0);
                    dt.setUTCSeconds(data.exp);
                    this.jwt.expires = dt;
                    this.jwt.userName = user.userName;
                    var current = new Date();
                    var dateDifference = this.jwt.expires.valueOf() - current.valueOf();
                    
                    if(dateDifference <= 0) {
                        console.log("Token is expired, get a new one")
                        return false;
                    }

                    console.log("Have token and got through successfully")
                    return true;
            }

        console.log("You do not have an existing token");
        return false;
    }

    public decodeToken(token: string = '') {
        if (token === null || token === '') { return { 'upn': '' }; }
        const parts = token.split('.');
        if (parts.length !== 3) {
    
            throw new Error('JWT must have 3 parts');
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    }
    
    private urlBase64Decode(str: string) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return decodeURIComponent((<any>window).escape(window.atob(output)));
    }
}