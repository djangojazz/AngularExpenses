import { NgModule } from '@angular/core';
import { FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './Category.component';
import { CategoriesService } from '../../Services/Categories.service'
import { MatInputModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NewcategorydialogComponent } from './newcategorydialog.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatDialogModule
  ],
  declarations: [CategoryComponent,
    NewcategorydialogComponent
],
  providers: [CategoriesService]
})
export class CategoryModule { }