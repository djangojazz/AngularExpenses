import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './Category.component';
import { CategoriesService } from '../../Services/Categories.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CategoryComponent],
  providers: [CategoriesService]
})
export class CategoryModule { }