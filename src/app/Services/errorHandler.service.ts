import { Injectable, ErrorHandler } from '@angular/core';
import { MoneyEntryError  } from "../Models/moneyEntryError";

@Injectable()
export class ErrorHandlerService implements ErrorHandler{

  handleError(error: any): void {
    let customError: MoneyEntryError = new MoneyEntryError();
    customError.errorNumber = 500;
    customError.message = (<Error>error).message;
    customError.friendlyMessage = 'An error occurred on Error Handler Service. Please try again.'
    console.log(customError);
  }

  constructor() { }
}
