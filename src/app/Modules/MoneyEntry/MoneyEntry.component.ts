import { Component, OnInit } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/Transaction';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material';
import { SharedErrorStateMatcher } from '../../Shared/sharedErrorStateMacher';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Models/Category';

@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './MoneyEntry.component.html',
  styleUrls: ['./MoneyEntry.component.scss']
})
export class MoneyEntryComponent  {
  debitCredit = false;
  transactions: Transaction[];
  categories: Category[];

  public cat
  moneyForm: FormGroup;

  constructor(private transactionService: TransactionsService, 
              private categoriesService: CategoriesService,
              private sharedValidator: SharedValidatorFunctions,
              private fb: FormBuilder) { 
    }

  ngOnInit() {
    this.transactionService.loadTransactions()
      .subscribe(x => this.transactions = x);

    this.categoriesService.loadCategories()
      .subscribe(x => this.categories = x);

    this.moneyForm = this.fb.group({
      debitCreditFormControl: [false],
      amountFormControl: [10, [Validators.required, this.sharedValidator.numberValidator]]
    })
  }

  submit() {
    console.log(this.debitCredit);
  }

  matcher = new SharedErrorStateMatcher();
}
