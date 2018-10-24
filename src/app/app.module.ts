import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http"
import { StorageServiceModule } from "angular-webstorage-service";

import { AppComponent } from './app.component';
import { AppRoutingModule  } from "./Shared/app-routing.module";

import { CategoryModule  } from "./Modules/Category/category.module";
import { MoneyModule } from "./Modules/Money/money.module";
import { ChartingModule  } from "./Modules/Charting/charting.module";
import { ServicesModule } from "./Services/services.module";
import { MaterialModule } from "./Modules/material.module"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedValidatorFunctions } from './Shared/sharedValidatorFunctions';

import { PageNotFoundComponent  } from "./Shared/page-not-found.component";
import { LoginComponent } from './Shared/login.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    SharedValidatorFunctions
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ServicesModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
