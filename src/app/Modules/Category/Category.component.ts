import { Component, OnInit } from '@angular/core';
import { CategoriesService  } from "../../Services/Categories.service";
import { Category  } from "../../Models/Category";

@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.css']
})
export class CategoryComponent implements OnInit {
  public Categories: Category[] = [];

  constructor(private service: CategoriesService)   { 
    this.Categories = service.Categories;
  }

  ngOnInit() {
    this.service.loadCategories()
      .subscribe(() => this.Categories = this.service.Categories);
  }

}
