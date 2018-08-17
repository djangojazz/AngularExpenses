import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs"

import { environment  } from "../../environments/environment";
import { tap } from "rxjs/operators";
import { UserModel } from "../Models/userModel";

@Injectable()
export class AuthService {
    private endpoint = `${environment.baseApi}/auth`;
    private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    public jwt: string = "";

    constructor(private http: HttpClient) {
    }

    public getSalt(userName: string): Observable<string> {
        return this.http.get<string>(`${this.endpoint}/getSalt/${userName}`)
    }

    public createAuthToken(user: UserModel) {
        this.http.post<string>(`${this.endpoint}/createUserToken`, user, { headers: this.headers})
            .subscribe(data => this.jwt = data);
        console.log(this.jwt);
    }
    
    // public createANewTransaction(transaction: Transaction): Observable<Transaction> {
    //     return this.http.post<Transaction>(`${this.endpoint}/postTransaction`, transaction, { headers: this.headers});
    //     }

    // public loadCategories(): Observable<Category[]> {
    //     return this.http.get<Category[]>(`${this.endpoint}/getCategories`)
    //         .pipe(tap(results => this.alphabetize(results)))
    // }
}