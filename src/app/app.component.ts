import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GlobalService } from './Services/globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  events = [];
  currentUser: string;
  title = 'MoneyEntry';
  showFiller = false;

  constructor(private globalService: GlobalService) {
    this.globalService.subTitle = "";
  }

  public navChanged(nav: string) {
    this.title = `MoneyEntry - ${nav} ${this.globalService.subTitle}`;
  }
}
