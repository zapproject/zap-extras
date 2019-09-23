import { ZapSubscriber } from '@zapjs/subscriber';

interface Transaction {
	txid: string;
	comment: string;
	blockNumber?: number;
	status?: boolean;
}

export class TransactionsQueue {

	private confirmBlocks = 5;

	private transactionsQueue: Transaction[] = [];

	private blockHeaderSubscription = null;

	private blockNumber = null;

	private txListeners: Array<{txid: string, cb: (...args: any[]) => void}> = [];

	constructor(private subscriber: ZapSubscriber) {
		this.checkConfirmedTransactions = this.checkConfirmedTransactions.bind(this);
		this.updateTransaction = this.updateTransaction.bind(this);
		this.blockHeaderSubscription = this.subscriber.zapRegistry.provider
			.subscribe('newBlockHeaders')
			.on('data', this.checkConfirmedTransactions);
	}

	private async checkConfirmedTransactions(blockHeader) {
		this.blockNumber = blockHeader.number;
		if (!this.transactionsQueue.length) return;
		await Promise.all(this.transactionsQueue.filter(tx => !tx.blockNumber).map(this.updateTransaction));
		this.transactionsQueue.filter(tx => !!tx.blockNumber).forEach(tx => {
			if (this.blockNumber - tx.blockNumber > this.confirmBlocks) this.confirmTransaction(tx);
		});
	}

	private confirmTransaction(tx: Transaction) {
		this.txListeners.filter(l => l.txid === tx.txid).forEach(l => { l.cb(tx); })
		this.removeFromQueue(tx.txid);
	}

	private updateTransaction(tx: Transaction) {
		return this.subscriber.zapRegistry.provider.getTransactionReceipt(tx.txid, tx => {
			tx.blockNumber = tx.blockNumber;
			tx.status = tx.status;
		});
	}

	private removeFromQueue(txid) {
		let i = this.transactionsQueue.length;
		while (i--) {
			if (this.transactionsQueue[i].txid !== txid) continue;
			this.transactionsQueue.splice(i, 1);
			break;
		}
	}

	add(txid, comment) {
		this.transactionsQueue.push({txid, comment});
	}

	subscribe(txid: string, cb: (tx: any) => void): () => any {
		const index = this.txListeners.push({txid, cb}) - 1;
		return () => {
			this.txListeners.splice(index, 1);
		};
	}

	destrory() {
		this.blockHeaderSubscription.unsubscribe();
	}
}
