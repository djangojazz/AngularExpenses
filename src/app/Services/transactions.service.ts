import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs"

import { Transaction } from "../Models/Transaction";
import { environment  } from "../../environments/environment";
import { tap } from "rxjs/operators";

@Injectable()
export class TransactionsService {
    public Transaction: Transaction[] = [];
    private endpoint = `${environment.baseApi}/transactions`;
    private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

constructor(private http: HttpClient) { 
}

public loadTransactions(personId?: number, start?: DateTimeFormat, end?: DateTimeFormat): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.endpoint}/getTransactions/${personId}/${start}/${end}`);
    }
}