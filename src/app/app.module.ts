import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http"
import { StorageServiceModule } from "angular-webstorage-service";

import { AppComponent } from './app.component';
import { AppRoutingModule  } from "./Shared/app-routing.module";

import { CategoryModule  } from "./Modules/Category/category.module";
import { MoneyEntryModule } from "./Modules/MoneyEntry/moneyEntry.module"
import { ReconciliationModule  } from "./Modules/Reconciliation/reconciliation.module";
import { QueryModule } from "./Modules/Query/query.module";
import { ChartingModule  } from "./Modules/Charting/charting.module";
import { ServicesModule } from "./Services/services.module";
import { MaterialModule } from "./Modules/material.module"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageNotFoundComponent  } from "./Shared/page-not-found.component";
import { LoginComponent } from './Shared/login.component';
import { AuthService } from './Services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CategoryModule,
    MoneyEntryModule,
    ReconciliationModule,
    QueryModule,
    ChartingModule,
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
