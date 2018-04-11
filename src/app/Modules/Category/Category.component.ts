import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog  } from "@angular/material";
import { CategoriesService  } from "../../Services/Categories.service";
import { Category  } from "../../Models/Category";
import { DataSource} from '@angular/cdk/collections';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';
import { NewcategorydialogComponent } from './newcategorydialog.component';

@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categories: Category[] = [];
  
  constructor(private service: CategoriesService, private dialog: MatDialog)   { 
    this.categories = service.Categories;
  }

  ngOnInit() {
    this.service.loadCategories()
      .subscribe(() => this.categories = this.service.Categories);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewcategorydialogComponent, {
      width: '300px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}