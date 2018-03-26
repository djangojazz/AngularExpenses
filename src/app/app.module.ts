import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule  } from "./app-routing.module";

import { CategoryModule  } from "./Category/Category.module";
import { MoneyEntryModule } from "./MoneyEntry/MoneyEntry.module"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CategoryModule,
    MoneyEntryModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
