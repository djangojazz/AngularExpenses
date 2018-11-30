import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { TransactionsService } from '../../Services/transactions.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Category } from '../../Models/category';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CategoriesService } from '../../Services/categories.service';
import { Transaction } from '../../Models/transaction';

function categoryRange(cats: string[]): ValidatorFn {
  return  (c: AbstractControl): {[key: string]: boolean} | null => {
    if (cats.find(x => x == c.value) === undefined) {
        return { 'isCategory': true };
    }
      return null;
  };
}

@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './MoneyEntry.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyEntryComponent implements OnInit {
  idLabel: string;
  moneyForm: FormGroup;
  currentCategory: Category;
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
    this.currentTran = this.route.snapshot.data['tran'];
    this.idLabel = (this.currentTran.transactionID > 0) ? this.currentTran.transactionID.toString() : "New";

    var cats = this.categoriesService.Categories.map<string>(x => x.description);

    this.currentCategory = (this.currentTran.transactionID > 0) 
      ? new Category(this.currentTran.category, this.currentTran.categoryID) 
      : new Category('Food', 28);

    this.moneyForm = this.fb.group({
      debitCreditFormControl: [(this.currentTran.transactionID > 0) ? 
        (this.currentTran.type == "1") ? true : false : 
        false],
      categoryFormControl: [this.currentCategory, [Validators.required, 
        categoryRange(cats)
      ]],
      amountFormControl: [(this.currentTran.transactionID > 0) 
        ? this.currentTran.amount 
        : 10, [Validators.required, this.sharedValidator.numberValidator]],
      descFormControl: [(this.currentTran.transactionID > 0) 
        ? this.currentTran.transactionDesc 
        : 'groceries', [Validators.required]],
      dateFormControl: [this.currentTran.createdDate || Date.now, [Validators.required]]
    })

    
    this.filteredCategories = this.moneyForm.get('categoryFormControl').valueChanges
      .pipe(
        startWith<string | Category>(''),
        map(x => typeof x === 'string' ? x : x.description),
        map(name => name ? this.filter(name) : this.categories.slice())
      );
  }

  categoryLeft() {
    // console.log(this.currentTran.category);
    // var catControl = this.moneyForm.controls['categoryFormControl'];
    //  this.currentTran.category = catControl.value;
    // console.log(catControl.value);
    // this.sharedValidator.categoryValidator.call;
  }
  
  filter(desc: string): Category[] {
    return this.categories.filter(x =>
      x.description.toLowerCase().indexOf(desc.toLowerCase()) === 0);
  }

  displayFn(cat?: Category): string | undefined {
    return cat ?  cat.description : undefined;
  }

  
  submit() {
    var cat: Category = this.moneyForm.get('categoryFormControl').value
    
    console.log(this.categoriesService.hasCategory(cat.description));
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
