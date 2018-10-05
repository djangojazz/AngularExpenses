import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './Services/auth.service';
import { JWT } from './Models/jwt';

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

  constructor(private authService: AuthService) {
    this.authService.jwt = new JWT();
  }

}
