import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService  } from "../../Services/transactions.service";
import { Transaction } from '../../Models/transactionModel';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { CategoriesService } from '../../Services/categories.service';
import { map} from 'rxjs/operators';
import { AuthService } from '../../Services/auth.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { KeyValue } from '@angular/common';
import { TransactionReconcile } from '../../Models/transactionReconcileModel';

@Component({
  selector: 'app-MoneyEntry',
  templateUrl: './moneyListings.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyListingsComponent implements OnInit {
  transactions: Transaction[] = [];
  // startDate: Date = new Date;
  // endDate: Date = new Date;
  initialLoadDone: Boolean = false;
  reconciled = new Map<number, boolean>();

  displayedColumns = ['transactionID','description','amount','type','category','createdDate','runningTotal','reconciled'];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  newCategory: string;

  isLoadingResults = false;
  isErrorState = false;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  moneyListingsForm: FormGroup;

  constructor(public transactionService: TransactionsService, 
              private categoriesService: CategoriesService,
              private authService: AuthService,
              private fb: FormBuilder) { 
      this.authService.subTitle = "Entry";
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
    
  ngOnInit() {
    var currentDate = new Date();
    this.moneyListingsForm = this.fb.group({
      startDateFormControl: [new Date, [Validators.required]],
      endDateFormControl: [new Date, [Validators.required]]
    })

    //If you were already in the system and moving dates, show that instead.
    if(this.transactionService.maxDate != null && this.transactionService.minDate != null) {
        this.moneyListingsForm.get('startDateFormControl').setValue(this.transactionService.minDate);
        this.moneyListingsForm.get('endDateFormControl').setValue(this.transactionService.maxDate);
        this.setUpTransactionalData();
        this.initialLoadDone = true;
    } else {
      this.transactionService.getLastDate()
      .subscribe((x: Date) => {
        var dt = new Date(x);
        this.transactionService.minDate = dt || new Date();
        this.transactionService.maxDate = new Date();
        
        this.categoriesService.setupCategoriesCache();
        this.moneyListingsForm.get('startDateFormControl').setValue(this.transactionService.minDate);
        //Callback to value changed will do the load as the data changes for the end date and also handle initial load query.
        this.initialLoadDone = true;
        this.moneyListingsForm.get('endDateFormControl').setValue(this.transactionService.maxDate);
      });
    }

    this.moneyListingsForm.get('startDateFormControl').valueChanges
      .subscribe(x => {
        if(this.initialLoadDone) {
          this.setUpTransactionalData();
        }
      });

    this.moneyListingsForm.get('endDateFormControl').valueChanges
      .subscribe(x => {
        if(this.initialLoadDone) {
          this.setUpTransactionalData();
        }
      });
  }

  setUpTransactionalData() {
    this.isLoadingResults = true
    this.transactionService.minDate = this.moneyListingsForm.get('startDateFormControl').value;
    this.transactionService.maxDate = this.moneyListingsForm.get('endDateFormControl').value;
    
    this.transactionService.loadTransactions(this.transactionService.minDate, this.transactionService.maxDate)
       .subscribe((trans: Transaction[]) => {
         this.transactionService.Transactions = trans;
         this.dataSource.data = this.transactionService.Transactions;
       });
    this.isLoadingResults = false
    this.reconciled.clear();
  }

  reconcile() {
   const trans: TransactionReconcile[] = [];
   this.reconciled.forEach((v, k) => trans.push(new TransactionReconcile(k, v)));
   console.log(trans);
   this.transactionService.reconcileTransactions(trans)
    .subscribe(
      result => console.log(`reconciled: ${result}`),
      (err: any) => console.log(err)
    )
  }

  changed = (tranId: number, checked: boolean) => this.reconciled.set(tranId, checked);
}
