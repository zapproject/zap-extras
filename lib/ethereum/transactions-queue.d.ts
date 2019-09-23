import { ZapSubscriber } from '@zapjs/subscriber';
export declare class TransactionsQueue {
    private subscriber;
    private confirmBlocks;
    private transactionsQueue;
    private blockHeaderSubscription;
    private blockNumber;
    private txListeners;
    constructor(subscriber: ZapSubscriber);
    private checkConfirmedTransactions;
    private confirmTransaction;
    private updateTransaction;
    private removeFromQueue;
    add(txid: any, comment: any): void;
    subscribe(txid: string, cb: (tx: any) => void): () => any;
    destrory(): void;
}
