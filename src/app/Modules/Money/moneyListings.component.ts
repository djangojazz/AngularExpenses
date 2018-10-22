import { Component, OnInit } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/transaction';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SharedErrorStateMatcher } from '../../Shared/sharedErrorStateMacher';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';
import { CategoriesService } from '../../Services/categories.service';
import { Category } from '../../Models/category';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './moneyListings.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyListingsComponent implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  startDate: Date;
  endDate: Date;
  
  filteredCategories: Observable<Category[]>;
  moneyForm: FormGroup;

  constructor(private transactionService: TransactionsService, 
              private categoriesService: CategoriesService,
              private sharedValidator: SharedValidatorFunctions,
              private authService: AuthService,
              private fb: FormBuilder) { 
      this.authService.subTitle = "Entry";
    }

  ngOnInit() {
    this.moneyForm = this.fb.group({
      debitCreditFormControl: [false],
      categoryFormControl: [new Category('Food', 28), [Validators.required]],
      amountFormControl: [10, [Validators.required, this.sharedValidator.numberValidator]],
      descFormControl: ['groceries', [Validators.required]],
      startDateFormControl: [this.startDate, [Validators.required]],
      endDateFormControl: [this.endDate, [Validators.required]],
    })

    this.categoriesService.loadCategories()
      .subscribe(x => this.categories = x);

    this.transactionService.getLastDate()
      .subscribe((x: Date) => {
        this.endDate = new Date(x);
        this.startDate = new Date(x);
        this.startDate.setDate(this.startDate.getDate() - 21);
        console.log(`start ${this.startDate} end ${this.endDate}`)
        this.moneyForm.setValue({ 
          debitCreditFormControl: this.moneyForm.get('debitCreditFormControl').value,
          categoryFormControl: this.moneyForm.get('categoryFormControl').value,
          amountFormControl: this.moneyForm.get('amountFormControl').value,
          descFormControl: this.moneyForm.get('descFormControl').value,
          startDateFormControl: this.startDate,
          endDateFormControl: this.endDate
        })
        
      this.transactionService.loadTransactions(this.startDate, this.endDate)
        .subscribe(x => this.transactions = x);
      });


    this.filteredCategories = this.moneyForm.get('categoryFormControl').valueChanges
      .pipe(
        startWith<string | Category>(''),
        map(x => typeof x === 'string' ? x: x.description),
        map(name => name ? this.filter(name) : this.categories.slice())
      );

    this.moneyForm.get('startDateFormControl').valueChanges.pipe(
      map(x => x = this.startDate)
    )
    
    this.moneyForm.get('endDateFormControl').valueChanges.pipe(
      map(x => x = this.endDate)
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
    //console.log(`${<Date>this.moneyForm.get('startDateFormControl').value}-${<Date>this.moneyForm.get('endDateFormControl').value}`)
     this.transactionService.createANewTransaction( 
      new Transaction(<number>((this.moneyForm.get('debitCreditFormControl').value == true) ? 1 : 2),
          <number>(<Category>(this.moneyForm.get('categoryFormControl').value)).categoryId, <Date>this.moneyForm.get('startDateFormControl').value,
          this.moneyForm.get('amountFormControl').value, this.moneyForm.get('descFormControl').value)
        ).subscribe(
          (result: Transaction) => console.log(`saved entry to database ${result}`),
          (err: any) => console.log(err)
        );
  }

  matcher = new SharedErrorStateMatcher();
}
