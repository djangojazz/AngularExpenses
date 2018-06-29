import { Component, OnInit } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/Transaction';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, } from "@angular/forms";
import { SharedErrorStateMatcher } from '../../Shared/sharedErrorStateMacher';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Models/Category';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

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
      categoryFormControl: [new Category('Food', 28), [Validators.required]],
      amountFormControl: [10, [Validators.required, this.sharedValidator.numberValidator]],
      descFormControl: ['groceries', [Validators.required]],
      dateFormControl: [this.startDate, [Validators.required]]
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
          descFormControl: this.moneyForm.get('descFormControl').value,
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
     this.transactionService.createANewTransaction( 
      new Transaction(0, 1, <number>((this.moneyForm.get('debitCreditFormControl').value == true) ? 1 : 2),
          <number>(<Category>(this.moneyForm.get('categoryFormControl').value)).categoryId, <Date>this.moneyForm.get('dateFormControl').value,
          this.moneyForm.get('amountFormControl').value, this.moneyForm.get('descFormControl').value)
        ).subscribe(
          (result: Transaction) => console.log(`saved entry to database ${result}`),
          (err: any) => console.log(err)
        );
  }

  matcher = new SharedErrorStateMatcher();
}
