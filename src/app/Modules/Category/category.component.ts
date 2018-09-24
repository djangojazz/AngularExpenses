import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, 
  MatSnackBar, 
  MatTable, 
  MatPaginator, 
  MatSort, 
  MatSpinner,
  MatTableDataSource  } from "@angular/material";
import { CategoriesService  } from "../../Services/categories.service";
import { Category  } from "../../Models/category";
import { DialogComponent } from '../../Shared/dialog.component';

import {Observable, merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-Category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit  {
  displayedColumns = ['categoryId', 'description'];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  newCategory: string;

  isLoadingResults = false;
  isErrorState = false;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService,
    private service: CategoriesService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar)   { 
 }

 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

  ngOnInit() {
    this.service.loadCategories()
      .subscribe(data => {
        this.isLoadingResults = true
        this.dataSource.data = data
        this.isLoadingResults = false
      });

    this.authService.subTitle = "Category";
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height: '250px',
      data: { title: "Add Category", description: "Please description category"}
    });

    dialogRef.afterClosed().subscribe(result => { 
      
      if(result == undefined || result.toString().length == 0)
      {
        this.snackBar.open('Category is blank:', 'No category to create', { duration: 2000, verticalPosition: 'top' });
      }
      else
      {
        this.service.addCategory(result)
            .subscribe(
              cats => this.dataSource.data = cats,
              error => console.log(error)
            )

        this.snackBar.open('Created Category:', result, { duration: 2000, verticalPosition: 'top' });
      }
    });
  }
}