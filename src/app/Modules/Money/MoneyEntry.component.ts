import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { TransactionsService } from '../../Services/transactions.service';

@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './MoneyEntry.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyEntryComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRouteSnapshot, private tranService: TransactionsService) { 
  }

  ngOnInit() {
    this.id = this.route.params['id'];
  }

}
