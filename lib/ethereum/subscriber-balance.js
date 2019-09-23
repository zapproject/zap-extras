function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class SubscriberBalance {
  constructor(subscriber) {
    this.subscriber = subscriber;

    _defineProperty(this, "eventsQueue", []);

    _defineProperty(this, "updateTimeout", null);

    _defineProperty(this, "zap", void 0);

    _defineProperty(this, "approved", void 0);

    _defineProperty(this, "eventsSubscriptions", void 0);

    this.handleEvent = this.handleEvent.bind(this);
    const owner = this.subscriber.subscriberOwner;
    this.eventsSubscriptions = [this.subscriber.zapToken.contract.events.Approval({
      filter: {
        owner: owner
      }
    }, this.handleEvent), this.subscriber.zapBondage.contract.events.Bound({
      filter: {
        holder: owner
      }
    }, this.handleEvent), this.subscriber.zapBondage.contract.events.Unbound({
      filter: {
        holder: owner
      }
    }, this.handleEvent), this.subscriber.zapBondage.contract.events.Returned({
      filter: {
        holder: owner
      }
    }, this.handleEvent)];
    this.updateBalance();
  }

  handleEvent(error, event) {
    if (error != null) return;
    if (this.updateTimeout) clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(() => {
      this.updateBalance();
    }, 500);
  }

  notify() {
    this.eventsQueue.forEach(cb => {
      cb(this.zap, this.approved);
    });
  }

  updateBalance() {
    Promise.all([this.subscriber.getZapAllowance().then(value => {
      this.approved = String(value);
      return null;
    }), this.subscriber.getZapBalance().then(value => {
      this.zap = String(value);
      return null;
    })]).then(() => {
      this.notify();
    });
  }

  subscribe(cb) {
    const index = this.eventsQueue.push(cb) - 1;
    return () => {
      this.eventsQueue.splice(index, 1);
    };
  }

  destroy() {
    this.eventsSubscriptions.forEach(s => s.unsubscribe());
  }

}