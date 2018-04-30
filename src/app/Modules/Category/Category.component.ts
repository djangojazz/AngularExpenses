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

import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

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
    this.service.loadCategories();

      // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.loadCategories()
          //return this.service.loadSectionCategories(this.categories, this.paginator.pageSize, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isErrorState = false;
          this.resultsLength = this.service.Categories.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isErrorState = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
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