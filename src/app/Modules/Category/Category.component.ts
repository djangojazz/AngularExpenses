import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatSnackBar  } from "@angular/material";
import { CategoriesService  } from "../../Services/Categories.service";
import { Category  } from "../../Models/Category";
import { DataSource} from '@angular/cdk/collections';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable} from 'rxjs/Observable';
import { DialogComponent } from '../../Shared/dialog.component';

@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categories: Category[] = [];
  
  constructor(private service: CategoriesService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar)   { 
    this.categories = service.Categories;
  }

  ngOnInit() {
    this.service.loadCategories()
      .subscribe(() => this.categories = this.service.Categories);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height: '250px',
      data: { title: "Add Category", description: "Please name category"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open('Created Category:', result, 
      { 
        duration: 2000,
        verticalPosition: 'top'
      });
    });
  }
}