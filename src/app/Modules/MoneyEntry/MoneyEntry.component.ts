import { Component, OnInit } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/Transaction';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material';
import { SharedErrorStateMatcher } from '../../Shared/sharedErrorStateMacher';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';

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

  constructor(private service: TransactionsService, 
    private sharedValidator: SharedValidatorFunctions,
    private fb: FormBuilder) { 
      this.sharedValidator = new SharedValidatorFunctions();
    }

  ngOnInit() {
    this.service.loadTransactions()
      .subscribe(data => this.trans = data);

    this.moneyForm = this.fb.group({
      amountFormControl: [0, [Validators.required, this.sharedValidator.validateNumber]]
    })
  }

  submit() {
    console.log(this.checked);
  }

  matcher = new SharedErrorStateMatcher();
}
