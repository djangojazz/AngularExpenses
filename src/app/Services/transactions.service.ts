import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, of, observable } from 'rxjs';

import { Transaction } from "../Models/transaction";
import { environment  } from "../../environments/environment";

@Injectable()
export class TransactionsService {
    public Transactions: Transaction[] = [];
    private endpoint = `${environment.baseApi}/transactions`;
    private headers: HttpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localStorage.getItem("jwt")}`);

constructor(private http: HttpClient) { }

public getLastDate(): Observable<Date> {
    return this.http.get<Date>(`${this.endpoint}/getLastDate`, { headers: this.headers })
}

public loadTransactions(start?: Date, end?: Date): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.endpoint}/getTransactions/${start.toDateString()}/${end.toDateString()}`, { headers: this.headers });
    }

public setupTransactionsCache(start?: Date, end?: Date) {
    this.loadTransactions(start, end).subscribe((trans: Transaction[]) => this.Transactions = trans)
}

public getTransaction(transactionId: number): Transaction {
    return this.Transactions.find(x => x.transactionID == transactionId)
}

public createANewTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.endpoint}/postTransaction`, transaction, { headers: this.headers});
    }
}