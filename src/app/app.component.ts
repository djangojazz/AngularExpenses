import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './Services/auth.service';
import { JWT } from './Models/jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  events = [];
  title = 'MoneyEntry';
  showFiller = false;

  constructor(private authService: AuthService,
    private router: Router) {
  }

  public logOut() {
    this.authService.setUser("", "");
    this.router.navigateByUrl('/Login');
  }
}
