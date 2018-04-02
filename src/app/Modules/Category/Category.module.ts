import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './Category.component';
import { CategoriesService } from '../../Services/Categories.service'
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule
  ],
  declarations: [CategoryComponent],
  providers: [CategoriesService]
})
export class CategoryModule { }