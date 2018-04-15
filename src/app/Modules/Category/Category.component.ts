import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatSnackBar, MatTable, MatPaginator, MatSort, MatTableDataSource  } from "@angular/material";
import { CategoriesService  } from "../../Services/Categories.service";
import { Category  } from "../../Models/Category";
import { DialogComponent } from '../../Shared/dialog.component';
import { DataSource} from '@angular/cdk/collections';

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
export class CategoryComponent implements OnInit {
  public categories: Category[] = [];
  displayedColumns = ['categoryId', 'description'];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: CategoriesService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar)   { 
    this.categories = service.Categories;
  }

  ngOnInit() {
    //load up the categories that gets the data
    this.service.loadCategories()
      .subscribe(() => this.categories = this.service.Categories);

    this.dataSource.data = this.categories;

      // If the user changes the sort order, reset back to the first page.
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       return this.service.loadCategories();
    //     }),
    //     map(data => {
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = false;
    //       this.resultsLength = data.length;

    //       return data;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       // Catch if the GitHub API has reached its rate limit. Return empty data.
    //       this.isRateLimitReached = true;
    //       return observableOf([]);
    //     })
    //   ).subscribe(data => this.dataSource.data = data);
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

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
          .subscribe(() => this.categories = this.service.Categories);

        this.snackBar.open('Created Category:', result, { duration: 2000, verticalPosition: 'top' });
      }
    });
  }
}

const ELEMENT_DATA: Category[] = [
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