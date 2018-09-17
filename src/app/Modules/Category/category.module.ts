import { NgModule } from '@angular/core';
import { FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { DialogComponent } from '../../Shared/dialog.component';
import { RouterModule  } from "@angular/router";
import { LoginGuard } from '../../Guards/login-guard.service.ts.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: 'Category',
        canActivate: [LoginGuard],
        component: CategoryComponent
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