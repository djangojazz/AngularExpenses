import { NgModule, SkipSelf, Optional, ErrorHandler } from '@angular/core';
import { FormsModule  } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { CategoriesService } from './categories.service'
import { TransactionsService  } from "./transactions.service";
import { ErrorHandlerService } from "./errorHandler.service";

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [
    CategoriesService,
    TransactionsService,
    { provide: ErrorHandler, useClass: ErrorHandlerService }
  ]
})
export class ServicesModule { 
  constructor(@Optional() @SkipSelf() parentModule: ServicesModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}