export class Transaction {
    personID: number;
    name: string;
    amount: number;
    Description: string;
    typeID: number;
    type: string;
    categoryID: number;
    category: string;
    createdDate: Date;
    transactionID: number;
    runningTotal: number;
    reconciled: boolean;

    constructor(transactionId: number, personId: number, typeId: number, categoryId: number, createdDate: Date, amount: number, description: string) {
        this.transactionID = transactionId,
        this.personID = personId,
        this.typeID = typeId,
        this.categoryID = categoryId,
        this.createdDate = createdDate,
        this.amount = amount,
        this.Description = description
    }
}