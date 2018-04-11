import { Component, OnInit } from '@angular/core';
import { Category  } from "../../Models/Category";

@Component({
  selector: 'app-newcategorydialog',
  templateUrl: './NewCategoryDialog.component.html'
})
export class NewcategorydialogComponent {
  public category: Category = new Category();
}
