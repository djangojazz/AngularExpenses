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
    private endpoint = `${environment.baseApi}/categories`;
    private headers: Headers = new Headers(["Content-Type", "application/json"]);

    public loadCategories(): Observable<Category[]> {
        return this.http.get(this.endpoint)
            .map((result: Response) => this.Categories = result.json()
                .sort((x,y) => x.description < y.description ? -1 : 1)
            );
    }

    public addCategory(newCategory: string): boolean {
        try
        {
            var result =  this.http.post(this.endpoint, newCategory, { headers: this.headers });
            var map = result.map((result: Response) => 
            {
                this.Categories = result.json()
                
            });
            var sort = this.Categories.sort((x,y) => x.description < y.description ? -1 : 1)
            return true;
        }
        catch(ex)
        {
            throw ex;
        }
        
        
    }
}