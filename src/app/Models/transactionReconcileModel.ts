export class TransactionReconcile {
    transactionId: number;
    reconciled: boolean;
    
    constructor(transactionId: number, reconciled: boolean) {
        this.transactionId = transactionId;
        this.reconciled = reconciled;
    }
}