import { Component, OnInit } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/Transaction';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material';
import { SharedErrorStateMatcher } from '../../Shared/sharedErrorStateMacher';
//import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';

function isNumeric(): ValidatorFn {
  return  (c: AbstractControl): {[key: string]: boolean} | null => {
      if (c.value !== undefined && (isNaN(c.value))) {
          return { 'isNumeric': true };
      };
      return null;
      };
  }

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
    //private sharedValidator: SharedValidatorFunctions,
    private fb: FormBuilder) { 
    }

  ngOnInit() {
    this.service.loadTransactions()
      .subscribe(data => this.trans = data);

    this.moneyForm = this.fb.group({
      amountFormControl: [10, [Validators.required, isNumeric()]]
        //this.sharedValidator.numberValidator]]
    })
  }

  submit() {
    console.log(this.checked);
  }

  matcher = new SharedErrorStateMatcher();
}
