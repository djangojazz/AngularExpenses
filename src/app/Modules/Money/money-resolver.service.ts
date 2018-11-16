import { Injectable, Inject }  from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from "@angular/router";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Transaction } from '../../Models/transaction';
import { TransactionsService } from '../../Services/transactions.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyResolverService implements Resolve<Transaction> {

  constructor(private transactionService: TransactionsService,
    private router: Router) {}

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Transaction> {
  let id = route.params['id'];
  if(isNaN(id)) {
      console.log(`TransactionId id was not a number: ${id}`);
      this.router.navigate(['/Money']);
      return of(null);
  }

  let transaction = this.transactionService.getTransaction(+id);
          if(transaction) {
              return of(transaction);
          }

          console.log(`Transaction was not found: ${id}`);
          this.router.navigate(['/Money']);
          return null;
  }
}
