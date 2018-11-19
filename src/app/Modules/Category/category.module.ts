import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { MaterialModule } from '../material.module';
import { DialogComponent } from '../../Shared/dialog.component';
import { RouterModule  } from "@angular/router";
import { LoginGuard } from '../../Guards/login-guard.service.ts.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoryComponent,
      }
    ])
  ],
  entryComponents: [DialogComponent],
  declarations: [
    CategoryComponent,
    DialogComponent
  ]
})
export class CategoryModule { }