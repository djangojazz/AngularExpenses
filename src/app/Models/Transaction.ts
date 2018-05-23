export interface Transaction {
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
}