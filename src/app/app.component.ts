import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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

  public navChanged(nav: string) {
    this.title = `MoneyEntry - ${nav}`;
  }
}
