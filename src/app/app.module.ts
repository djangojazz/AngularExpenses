import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http"

import { AppComponent } from './app.component';
import { AppRoutingModule  } from "./app-routing.module";

import { CategoryModule  } from "./Modules/Category/Category.module";
import { MoneyEntryModule } from "./Modules/MoneyEntry/moneyEntry2.module"
import { ReconciliationModule  } from "./Modules/Reconciliation/reconciliation.module";
import { QueryModule } from "./Modules/Query/Query.module";
import { ChartingModule  } from "./Modules/Charting/Charting.module";
import { ServicesModule } from "./Services/services.module";

import { MaterialModule } from "./Modules/material.module"

@NgModule({
  declarations: [
    AppComponent
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
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
