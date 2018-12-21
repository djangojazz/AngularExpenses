import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './Services/auth.service';
import { JWT } from './Models/jwt';
import { Router } from '@angular/router';
import { TransactionsService } from './Services/transactions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  events = [];
  title = 'MoneyEntry';
  showFiller = false;

  constructor(public authService: AuthService,
    private transactionsService: TransactionsService,
    private router: Router) {
  }

  public logOut() {
    this.authService.setUser("", "");
    localStorage.clear();
    this.transactionsService.Transactions = [];
    this.router.navigateByUrl('/Login');
  }
}
