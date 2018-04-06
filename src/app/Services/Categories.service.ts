import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs"
import 'rxjs/add/operator/map';
import { Category } from "../Models/Category";
import { environment  } from "../../environments/environment";

@Injectable()
export class CategoriesService {
    constructor(private http: Http) { }
    public Categories: Category[] = [];
    
    public loadCategories(): Observable<Category[]> {
        return this.http.get(`${environment.baseApi}/categories`)
            .map((result: Response) => this.Categories = result.json());
    }
}