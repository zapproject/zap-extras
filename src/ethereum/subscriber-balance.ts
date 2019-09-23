import { ZapSubscriber } from '@zapjs/subscriber';

interface Callback {
	(zap: string, allowance: string): void
}

export class SubscriberBalance {

	private eventsQueue: Array<Callback> = [];

	private updateTimeout = null;

	zap: string;
	approved: string;

	private eventsSubscriptions;

	constructor(private subscriber: ZapSubscriber) {
		this.handleEvent = this.handleEvent.bind(this);

		const owner = this.subscriber.subscriberOwner;
		this.eventsSubscriptions = [
			this.subscriber.zapToken.contract.events.Approval({
				filter: {owner: owner},
			}, this.handleEvent),
			this.subscriber.zapBondage.contract.events.Bound({
				filter: {holder: owner},
			}, this.handleEvent),
			this.subscriber.zapBondage.contract.events.Unbound({
				filter: {holder: owner},
			}, this.handleEvent),
			this.subscriber.zapBondage.contract.events.Returned({
				filter: {holder: owner},
			}, this.handleEvent),
		];

		this.updateBalance();
	}

	private handleEvent(error, event) {
		if (error != null) return;
		if (this.updateTimeout) clearTimeout(this.updateTimeout);
		this.updateTimeout = setTimeout(() => {
			this.updateBalance();
		}, 500);
	}

	private notify() {
		this.eventsQueue.forEach(cb => {cb(this.zap, this.approved)});
	}

	private updateBalance() {
		Promise.all([
			this.subscriber.getZapAllowance().then(value => {
				this.approved = String(value);
				return null;
			}),
			this.subscriber.getZapBalance().then(value => {
				this.zap = String(value);
				return null;
			}),
		]).then(() => { this.notify(); });
	}

	subscribe(cb: Callback): () => any {
		const index = this.eventsQueue.push(cb) - 1;
		return () => {
			this.eventsQueue.splice(index, 1);
		};
	}

	destroy() {
		this.eventsSubscriptions.forEach(s => s.unsubscribe());
	}
}
