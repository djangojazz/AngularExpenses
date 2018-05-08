import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, 
  MatSnackBar, 
  MatTable, 
  MatPaginator, 
  MatSort, 
  MatSpinner,
  MatTableDataSource  } from "@angular/material";
import { CategoriesService  } from "../../Services/Categories.service";
import { Category  } from "../../Models/Category";
import { DialogComponent } from '../../Shared/dialog.component';

import {Observable, merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.scss']
})
export class CategoryComponent implements OnInit  {
  displayedColumns = ['categoryId', 'description'];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();

  isLoadingResults = false;
  isErrorState = false;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: CategoriesService, 
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
        this.service.addCategory(result);

        this.snackBar.open('Created Category:', result, { duration: 2000, verticalPosition: 'top' });
      }
    });
  }
}