export class Transaction {
    personID: number;
    name: string;
    amount: number;
    transactionDesc: string;
    typeID: number;
    type: string;
    categoryID: number;
    category: string;
    createdDate: Date;
    transactionID: number;
    runningTotal: number;
    reconciled: boolean;

    constructor(typeId: number = 2, categoryId: number = 2, createdDate: Date = new Date(), amount: number = 40, transactiondesc: string = "groceries", transactionId: number = 0) {
        this.transactionID = transactionId;
        this.typeID = typeId;
        this.categoryID = categoryId;
        this.createdDate = createdDate;
        this.amount = amount;
        this.transactionDesc = transactiondesc;
    }
}