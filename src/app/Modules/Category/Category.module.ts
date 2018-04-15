import { NgModule } from '@angular/core';
import { FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './Category.component';
import { CategoriesService } from '../../Services/Categories.service'
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from '../../Shared/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [DialogComponent
  ],
  declarations: [CategoryComponent,
    DialogComponent
  ],
  providers: [CategoriesService]
})
export class CategoryModule { }