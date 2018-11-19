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

    constructor(typeId: number, categoryId: number, createdDate: Date, amount: number, transactiondesc: string, transactionId: number = 0) {
        this.transactionID = transactionId;
        this.typeID = typeId;
        this.categoryID = categoryId;
        this.createdDate = createdDate;
        this.amount = amount;
        this.transactionDesc = transactiondesc;
    }
}