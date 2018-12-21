import { Component, OnInit } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/transactionModel';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  startDate: Date = new Date;
  endDate: Date = new Date;
  initialLoadDone: Boolean = false;
  
  moneyListingsForm: FormGroup;

  constructor(public transactionService: TransactionsService, 
              private categoriesService: CategoriesService,
              private authService: AuthService,
              private fb: FormBuilder) { 
      this.authService.subTitle = "Entry";
    }

  ngOnInit() {
    this.moneyListingsForm = this.fb.group({
      startDateFormControl: [this.startDate, [Validators.required]],
      endDateFormControl: [this.endDate, [Validators.required]]
    })

    this.transactionService.getLastDate()
      .subscribe((x: Date) => {
        this.endDate = new Date(x);
        this.startDate = new Date(x);
        this.startDate.setDate(this.startDate.getDate() - 21);
        
        this.categoriesService.setupCategoriesCache();
        this.moneyListingsForm.get('startDateFormControl').setValue(this.startDate);
        //Callback to value changed will do the load as the data changes for the end date and also handle initial load query.
        this.initialLoadDone = true;
        this.moneyListingsForm.get('endDateFormControl').setValue(this.endDate);
      });

      this.moneyListingsForm.get('startDateFormControl').valueChanges
        .pipe(map(x => this.startDate = x))
        .subscribe(x => {
          if(this.initialLoadDone) {
            this.transactionService.setupTransactionsCache(this.startDate, this.endDate);
          }
        });

      this.moneyListingsForm.get('endDateFormControl').valueChanges
        .pipe(map(x => this.endDate = x))
        .subscribe(x => {
          if(this.initialLoadDone) {
            this.transactionService.setupTransactionsCache(this.startDate, this.endDate);
          }
        });
  }
}
