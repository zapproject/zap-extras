export interface ITransactionLink {
    (hash: string, network: any): string;
}
export declare const transactionLink: ITransactionLink;
