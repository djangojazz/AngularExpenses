import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from '../../Services/transactions.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Category } from '../../Models/category';
import { SharedValidatorFunctions } from '../../Shared/sharedValidatorFunctions';
import { Observable } from 'rxjs';
import { CategoriesService } from '../../Services/categories.service';
import { Transaction } from '../../Models/transactionModel';
import { SharedErrorStateMatcher } from '../../Shared/sharedErrorStateMacher';

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
    private router: Router,
    private sharedValidator: SharedValidatorFunctions,
    public categoriesService: CategoriesService,
    private transactionService: TransactionsService,
    private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.currentTran = this.route.snapshot.data['tran'];
    this.idLabel = (this.currentTran.transactionID > 0) ? this.currentTran.transactionID.toString() : "New";
    console.log(this.currentTran);

    this.moneyForm = this.fb.group({
      dateFormControl: [this.currentTran.createdDate, [Validators.required]],
      debitCreditFormControl: [(this.currentTran.typeID == 1) ? true : false],
      categoryFormControl: [this.currentTran.categoryID, [Validators.required]],
      amountFormControl: [this.currentTran.amount, [Validators.required, this.sharedValidator.numberValidator]],
      descFormControl: [this.currentTran.description, [Validators.required]],
      recFormControl: [this.currentTran.reconciled, [Validators.required]],
    })
  }

  submit() {
    // console.log(new Transaction(<number>((this.moneyForm.get('debitCreditFormControl').value == true) ? 1 : 2),
    // <number>this.moneyForm.get('categoryFormControl').value, <Date>this.moneyForm.get('dateFormControl').value,
    // this.moneyForm.get('amountFormControl').value, this.moneyForm.get('descFormControl').value, this.currentTran.transactionID));

     this.transactionService.createANewTransaction( 
        new Transaction(
          <number>((this.moneyForm.get('debitCreditFormControl').value == true) ? 1 : 2),
          <number>this.moneyForm.get('categoryFormControl').value, 
          <Date>this.moneyForm.get('dateFormControl').value,
          this.moneyForm.get('amountFormControl').value, 
          this.moneyForm.get('descFormControl').value, 
          <number>this.currentTran.transactionID, 
          <boolean>this.moneyForm.get('recFormControl').value
        )
      ).subscribe(
        (result: Transaction) => console.log(`saved entry to database ${result}`),
        (err: any) => console.log(err)
      );
        
    this.router.navigate(['/Money']);
  }

  cancel() {
    this.router.navigate(['/Money']);
  }

  matcher = new SharedErrorStateMatcher();
}
