import { NgModule } from '@angular/core';
import { FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from '../../Shared/dialog.component';
import { RouterModule  } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'Category',
        component: CategoryComponent
        //TODO: Work on getting child routes set up for viewing categories and adding a new catgory versus dialog popup later
        //children: []
      }
    ])
  ],
  entryComponents: [DialogComponent
  ],
  declarations: [
    CategoryComponent,
    DialogComponent
  ]
})
export class CategoryModule { }