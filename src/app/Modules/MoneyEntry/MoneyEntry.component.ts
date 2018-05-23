import { Component, OnInit } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/Transaction';

@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './MoneyEntry.component.html',
  styleUrls: ['./MoneyEntry.component.scss']
})
export class MoneyEntryComponent  {
  public selectedType = 'Debit';
  checked = false;
  public trans: Transaction[];

  constructor(private service: TransactionsService) { }

  ngOnInit() {
    this.service.loadTransactions()
      .subscribe(data => this.trans = data);
  }

  test() {
    console.log(this.checked);
  }


}
