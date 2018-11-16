import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { TransactionsService } from '../../Services/transactions.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../Models/category';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CategoriesService } from '../../Services/categories.service';
import { Transaction } from '../../Models/transaction';

@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './MoneyEntry.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyEntryComponent implements OnInit {
  id: number;
  moneyForm: FormGroup;
  date: Date;
  categories: Category[] = [];
  filteredCategories: Observable<Category[]>;
  currentTran: Transaction;

  constructor(private route: ActivatedRoute,
    private sharedValidator: SharedValidatorFunctions,
    private categoriesService: CategoriesService,
    private transactionService: TransactionsService,
    private fb: FormBuilder) { 
  }

  ngOnInit() {
    var snapshot = this.route.snapshot;
    this.id = snapshot.params['id'];
    if (this.id > 0) {
      this.currentTran = this.transactionService.Transactions.find(x => x.transactionID == this.id);
    }

    console.log(this.currentTran);
    //this.currentTran = this.transactionService.Transaction;
    
    this.categoriesService.loadCategories()
      .subscribe(x => this.categories = x);

    this.moneyForm = this.fb.group({
      debitCreditFormControl: [false],
      categoryFormControl: [new Category('Food', 28), [Validators.required]],
      amountFormControl: [10, [Validators.required, this.sharedValidator.numberValidator]],
      descFormControl: ['groceries', [Validators.required]],
      dateFormControl: [this.date, [Validators.required]]
    })

    
    this.filteredCategories = this.moneyForm.get('categoryFormControl').valueChanges
      .pipe(
        startWith<string | Category>(''),
        map(x => typeof x === 'string' ? x: x.description),
        map(name => name ? this.filter(name) : this.categories.slice())
      );
    // this.moneyForm.setValue({ 
    //   debitCreditFormControl: this.moneyForm.get('debitCreditFormControl').value,
    //   categoryFormControl: this.moneyForm.get('categoryFormControl').value,
    //   amountFormControl: this.moneyForm.get('amountFormControl').value,
    //   descFormControl: this.moneyForm.get('descFormControl').value,
    //   startDateFormControl: this.startDate
    // })
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
    //  this.transactionService.createANewTransaction( 
    //   new Transaction(<number>((this.moneyForm.get('debitCreditFormControl').value == true) ? 1 : 2),
    //       <number>(<Category>(this.moneyForm.get('categoryFormControl').value)).categoryId, <Date>this.moneyForm.get('startDateFormControl').value,
    //       this.moneyForm.get('amountFormControl').value, this.moneyForm.get('descFormControl').value)
    //     ).subscribe(
    //       (result: Transaction) => console.log(`saved entry to database ${result}`),
    //       (err: any) => console.log(err)
    //     );
  }
}
