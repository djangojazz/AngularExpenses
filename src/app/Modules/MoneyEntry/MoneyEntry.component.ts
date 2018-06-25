import { Component, OnInit } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/Transaction';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, } from "@angular/forms";
//import { ErrorStateMatcher } from '@angular/material';
import { SharedErrorStateMatcher } from '../../Shared/sharedErrorStateMacher';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Models/Category';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './MoneyEntry.component.html',
  styleUrls: ['./MoneyEntry.component.scss']
})
export class MoneyEntryComponent  {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  filteredCategories: Observable<Category[]>;
  moneyForm: FormGroup;

  constructor(private transactionService: TransactionsService, 
              private categoriesService: CategoriesService,
              private sharedValidator: SharedValidatorFunctions,
              private fb: FormBuilder) { 
    }

  ngOnInit() {
    this.moneyForm = this.fb.group({
      debitCreditFormControl: [false],
      categoryFormControl: [new Category('Food', 28)],
      amountFormControl: [10, [Validators.required, this.sharedValidator.numberValidator]],
      dateFormControl: []
    })

    this.categoriesService.loadCategories()
      .subscribe(x => this.categories = x);

    this.transactionService.getLastDate(1)
      .subscribe(x => {
        this.startDate = x
        this.moneyForm.setValue({ 
          debitCreditFormControl: this.moneyForm.get('debitCreditFormControl').value,
          categoryFormControl: this.moneyForm.get('categoryFormControl').value,
          amountFormControl: this.moneyForm.get('amountFormControl').value,
          dateFormControl: x
        })
        
      this.transactionService.loadTransactions(1, this.startDate, this.endDate)
        .subscribe(x => this.transactions = x);
      });


    this.filteredCategories = this.moneyForm.get('categoryFormControl').valueChanges
      .pipe(
        startWith<string | Category>(''),
        map(x => typeof x === 'string' ? x: x.description),
        map(name => name ? this.filter(name) : this.categories.slice())
      );

    this.moneyForm.get('dateFormControl').valueChanges.pipe(
      map(x => x = this.startDate)
    )
  }


  filter(desc: string): Category[] {
    return this.categories.filter(x =>
      x.description.toLowerCase().indexOf(desc.toLowerCase()) === 0);
  }

  displayFn(cat?: Category): string | undefined {
    return cat ?  cat.description : undefined;
  }

  submit() {
    console.log(this.moneyForm.getRawValue());
     console.log(this.moneyForm.get('debitCreditFormControl').value);
    // console.log(this.moneyForm.get('categoryFormControl').value);
    // console.log(this.moneyForm.get('amountFormControl').value);
    // console.log(this.moneyForm.get('dateFormControl').value);
  }

  //matcher = new SharedErrorStateMatcher();
}
