export class Transaction {
    amount: number;
    description: string;
    typeID: number;
    categoryID: number;
    createdDate: Date;
    transactionID: number;
    runningTotal: number;
    reconciled: boolean;
    
    constructor(typeId: number, categoryId: number, createdDate: Date, amount: number, description: string, transactionId: number, reconciled: boolean) {
        this.transactionID = transactionId;
        this.typeID = typeId;
        this.categoryID = categoryId;
        this.createdDate = createdDate;
        this.amount = amount;
        this.description = description;
        this.reconciled = reconciled;
    }
}