import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs"
import 'rxjs/add/operator/map';
import { Category } from "../Models/Category";
import { environment  } from "../../environments/environment";

@Injectable()
export class CategoriesService {
    public Categories: Category[] = [];
    private endpoint = `${environment.baseApi}/categories`;
    private headers: Headers = new Headers();

    constructor(private http: Http) { 
        this.headers.append('Content-Type', 'application/json');
    }

    public loadCategories(): Observable<Category[]> {
        return this.http.get(this.endpoint)
            .map((result: Response) => this.alphabetize(result));
    }

    public loadSectionCategories(size: number, page: number): Observable<Category[]> {
        var sz = (size == undefined) ? 5 : size;
        var start = (sz * (page));
        var end = start + sz;

        var listing = this.Categories.slice(start, end);
        return Observable.of(listing);
    }

    public loadCategoriesStatic(): Category[] {
        return [
            {categoryId: 1, description: 'Hydrogen'},
            {categoryId: 2, description: 'Helium'},
            {categoryId: 3, description: 'Lithium'},
            {categoryId: 4, description: 'Beryllium'},
            {categoryId: 5, description: 'Boron'},
            {categoryId: 6, description: 'Carbon'},
            {categoryId: 7, description: 'Nitrogen'},
            {categoryId: 8, description: 'Oxygen'},
            {categoryId: 9, description: 'Fluorine'},
            {categoryId: 10, description: 'Neon'},
            {categoryId: 11, description: 'Sodium'},
            {categoryId: 12, description: 'Magnesium'},
            {categoryId: 13, description: 'Aluminum'},
            {categoryId: 14, description: 'Silicon'},
            {categoryId: 15, description: 'Phosphorus'},
            {categoryId: 16, description: 'Sulfur'},
            {categoryId: 17, description: 'Chlorine'},
            {categoryId: 18, description: 'Argon'},
            {categoryId: 19, description: 'Potassium'},
            {categoryId: 20, description: 'Calcium'},
          ];
    }

    public addCategory(newCategory: string): Observable<Category[]> {
        return this.http.post(this.endpoint, JSON.stringify(newCategory), { headers: this.headers})
            .map((result: Response) => this.alphabetize(result));
    }

    alphabetize = (result: Response) => this.Categories = result.json()
    .sort((x,y) => x.description < y.description ? -1 : 1)
}