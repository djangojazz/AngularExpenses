import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, of, observable } from 'rxjs';

import { Transaction } from "../Models/transaction";
import { environment  } from "../../environments/environment";

@Injectable()
export class TransactionsService {
    public Transaction: Transaction[] = [];
    private endpoint = `${environment.baseApi}/transactions`;
    private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

constructor(private http: HttpClient) { }

public getLastDate(personId: number): Observable<Date> {
    return this.http.get<Date>(`${this.endpoint}/getLastDate/${personId}`)
}

public loadTransactions(personId?: number, start?: Date, end?: Date): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.endpoint}/getTransactions/${personId}/${start}/${end}`);
    }

public createANewTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.endpoint}/postTransaction`, transaction, { headers: this.headers});
    }
}