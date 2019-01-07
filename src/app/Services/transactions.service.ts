import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, of, observable } from 'rxjs';

import { Transaction } from "../Models/transactionModel";
import { environment  } from "../../environments/environment";

@Injectable()
export class TransactionsService {
    public Transactions: Transaction[] = [];
    public minDate: Date;
    public maxDate: Date;
    private Cache: Transaction[] = [];
    private endpoint = `${environment.baseApi}/transactions`;
    private headers: HttpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json');

constructor(private http: HttpClient) { }

public getLastDate(): Observable<Date> {
    return this.http.get<Date>(`${this.endpoint}/getLastDate`, { headers: this.headers })
}

public loadTransactions(start?: Date, end?: Date): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.endpoint}/getTransactions/${start.toDateString()}/${end.toDateString()}`, { headers: this.headers });
    }

public setupTransactionsCache(start?: Date, end?: Date) {
    if (this.Cache.length === 0) {
        this.loadTransactions(start, end).subscribe((trans: Transaction[]) => {
            this.Cache = trans;
            this.Transactions = trans;
            this.minDate = start;
            this.maxDate = end;
        })
    } else {
        if (start >= this.minDate && end <= this.maxDate) {
            let t = this.Transactions.sort((a: Transaction, b: Transaction) => (new Date(a.createdDate)).getTime() - (new Date(b.createdDate)).getTime());

            this.Transactions = this.Cache.filter(x => new Date(x.createdDate) >= start && new Date(x.createdDate) <= end);
        } else {
            this.loadTransactions(start, end).subscribe((trans: Transaction[]) => {
                this.Cache = trans;
                this.Transactions = trans;
                this.minDate = start;
                this.maxDate = end;
            })
        }
    }
}

public getTransaction(transactionId: number): Transaction {
    return this.Transactions.find(x => x.transactionID == transactionId)
}

public createANewTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.endpoint}/postTransaction`, transaction, { headers: this.headers});
    }
}