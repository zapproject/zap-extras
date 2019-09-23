function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class TransactionsQueue {
  constructor(subscriber) {
    this.subscriber = subscriber;

    _defineProperty(this, "confirmBlocks", 5);

    _defineProperty(this, "transactionsQueue", []);

    _defineProperty(this, "blockHeaderSubscription", null);

    _defineProperty(this, "blockNumber", null);

    _defineProperty(this, "txListeners", []);

    this.checkConfirmedTransactions = this.checkConfirmedTransactions.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.blockHeaderSubscription = this.subscriber.zapRegistry.provider.subscribe('newBlockHeaders').on('data', this.checkConfirmedTransactions);
  }

  async checkConfirmedTransactions(blockHeader) {
    this.blockNumber = blockHeader.number;
    if (!this.transactionsQueue.length) return;
    await Promise.all(this.transactionsQueue.filter(tx => !tx.blockNumber).map(this.updateTransaction));
    this.transactionsQueue.filter(tx => !!tx.blockNumber).forEach(tx => {
      if (this.blockNumber - tx.blockNumber > this.confirmBlocks) this.confirmTransaction(tx);
    });
  }

  confirmTransaction(tx) {
    this.txListeners.filter(l => l.txid === tx.txid).forEach(l => {
      l.cb(tx);
    });
    this.removeFromQueue(tx.txid);
  }

  updateTransaction(tx) {
    return this.subscriber.zapRegistry.provider.getTransactionReceipt(tx.txid, tx => {
      tx.blockNumber = tx.blockNumber;
      tx.status = tx.status;
    });
  }

  removeFromQueue(txid) {
    let i = this.transactionsQueue.length;

    while (i--) {
      if (this.transactionsQueue[i].txid !== txid) continue;
      this.transactionsQueue.splice(i, 1);
      break;
    }
  }

  add(txid, comment) {
    this.transactionsQueue.push({
      txid,
      comment
    });
  }

  subscribe(txid, cb) {
    const index = this.txListeners.push({
      txid,
      cb
    }) - 1;
    return () => {
      this.txListeners.splice(index, 1);
    };
  }

  destrory() {
    this.blockHeaderSubscription.unsubscribe();
  }

}