import { Injectable }  from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router  } from "@angular/router";

import { Transaction } from '../../Models/transaction';
import { TransactionsService } from '../../Services/transactions.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyResolverService implements Resolve<Transaction> {

  constructor(private transactionService: TransactionsService,
    private router: Router) {}

resolve(route: ActivatedRouteSnapshot) : Observable<Transaction> {
    let id = route.params['id'];
    
    if(isNaN(id)) {
        console.log(`TransactionId id was not a number: ${id}`);
        this.router.navigate(['/Money']);
        return of(null);
    }

    if(id != 0 ) {
      let transaction = this.transactionService.getTransaction(+id);

      if(transaction) {
          return of(transaction);
      }
  
      console.log(`Transaction was not found for id: ${id}`);
      this.router.navigate(['/Money']);
      return null;
    } else {
      return of(new Transaction())
    }
    
  }
}
