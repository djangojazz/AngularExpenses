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
  startDate: Date;
  endDate: Date;
  
  moneyForm: FormGroup;

  constructor(private transactionService: TransactionsService, 
              private categoriesService: CategoriesService,
              private authService: AuthService) { 
      this.authService.subTitle = "Entry";
    }

  ngOnInit() {
    
    this.transactionService.getLastDate()
      .subscribe((x: Date) => {
        this.endDate = new Date(x);
        this.startDate = new Date(x);
        this.startDate.setDate(this.startDate.getDate() - 21);
        
        this.categoriesService.setupCategoriesCache();
        this.transactionService.setupTransactionsCache(this.startDate, this.endDate);
      });
      
    this.moneyForm.get('startDateFormControl').valueChanges.pipe(
      map(x => x = this.startDate)
    )
    
    this.moneyForm.get('endDateFormControl').valueChanges.pipe(
      map(x => x = this.endDate)
    )
  }




  matcher = new SharedErrorStateMatcher();
}
