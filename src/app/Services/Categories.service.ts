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
            .map((result: Response) => this.Categories = result.json()
                .sort((x,y) => x.description < y.description ? -1 : 1)
            );
    }

    public addCategory(newCategory: string): boolean {
        this.http.post(this.endpoint, JSON.stringify(newCategory), { headers: this.headers})
            .subscribe(response => {
                console.log(`created category ${newCategory}`)
                this.Categories.push(new Category(newCategory, 0));
                return true;
            }, error => {
                console.log(`${error}`)
                return false;
            });

        return true;
    }
}