import { Component, OnInit } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/Transaction';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";

@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './MoneyEntry.component.html',
  styleUrls: ['./MoneyEntry.component.scss']
})
export class MoneyEntryComponent  {
  public selectedType = 'Debit';
  checked = false;
  public trans: Transaction[];
  moneyForm: FormGroup;

  constructor(private service: TransactionsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.service.loadTransactions()
      .subscribe(data => this.trans = data);

    this.moneyForm = this.fb.group({
      amount: [0, [Validators.required, Validators.pattern("[0-9.]")]]
    })
  }

  submit() {
    console.log(this.checked);
  }


}
