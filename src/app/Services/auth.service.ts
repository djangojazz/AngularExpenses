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
    public jwtToken: JWT;

    constructor(private http: HttpClient) {
    }

    public getSalt(userName: string): Observable<string> {
        return this.http.get<string>(`${this.endpoint}/getSalt/${userName}`)
    }

    public createAuthToken(user: UserModel) {
        this.http.post<JWT>(`${this.endpoint}/createUserToken`, user, { headers: this.headers})
            .subscribe((jwt: JWT) => this.jwtToken = jwt);
    }
}