import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs"


import { Category } from "../Models/Category";
import { environment  } from "../../environments/environment";
import { tap } from "rxjs/operators";

@Injectable()
export class CategoriesService {
    public Categories: Category[] = [];
    private endpoint = `${environment.baseApi}/categories`;
    private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) {
    }

    public loadCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.endpoint}/getCategories`)
            .pipe(tap(results => this.alphabetize(results)))
    }

    public addCategory(newCategory: string): Observable<Category[]> {
        return this.http.post<Category[]>(
            `${this.endpoint}/postCategory`, 
            JSON.stringify(newCategory),
            { headers: this.headers})
        .pipe(tap(results => this.alphabetize(results)));
    }

    private alphabetize(categories: Category[]) {
        categories.sort((x,y) => x.description < y.description ? -1 : 1)
    }
}