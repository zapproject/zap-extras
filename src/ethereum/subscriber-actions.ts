import { ZapSubscriber } from "@zapjs/subscriber";
import { NULL_ADDRESS } from "@zapjs/types";
const {utf8ToHex, toHex} = require("web3-utils");

export class SubscriberActions {

	constructor(private subscriber: ZapSubscriber) {

	}

	private async checkBroker(provider, endpoint) {
		const broker = await this.subscriber.zapToken.contract.methods.getEndpointBroker(provider,utf8ToHex(endpoint)).call();
		if (broker !== NULL_ADDRESS && broker !== this.subscriber.subscriberOwner) {
			throw new Error(`Broker address ${broker} needs to call `);
		}
	}

	approve(zap: string, gas: number, gasPrice: string) {
		return new Promise((resolve, reject) => {
			this.subscriber.zapToken.contract.methods
				.approve(this.subscriber.zapBondage.contract._address, zap.toString())
				.send({ from: this.subscriber.subscriberOwner, gas, gasPrice })
				.on('transactionHash', (txid: string) => resolve(txid))
				.on('error', (error: any) => reject(error));
		});
	}

	unbond(provider: string, endpoint: string, dots: number, gas: number, gasPrice: string) {
		return this.checkBroker(provider, endpoint).then(() => new Promise((resolve, reject) => {
			this.subscriber.zapBondage.contract.methods
				.unbond(provider, utf8ToHex(endpoint), toHex(dots))
				.send({from: this.subscriber.subscriberOwner, gas, gasPrice})
				.on('transactionHash', (txid: string) => resolve(txid))
				.on('error', (error: any) => reject(error));
		}));
	}

	bond(provider: string, endpoint: string, dots: number, gas: number, gasPrice: string) {
		return this.checkBroker(provider, endpoint).then(() => new Promise((resolve, reject) => {
			this.subscriber.zapBondage.contract.methods
				.bond(provider, utf8ToHex(endpoint), toHex(dots))
				.send({from: this.subscriber.subscriberOwner, gas, gasPrice})
				.on('transactionHash', (txid: string) => resolve(txid))
				.on('error', (error: any) => reject(error));
		}));
	}

	delegateBond(delegateTo: string, provider: string, endpoint: string, dots: number, gas: number, gasPrice: string) {
		return this.checkBroker(provider, endpoint).then(() => new Promise((resolve, reject) => {
			this.subscriber.zapBondage.contract.methods
				.delegateBond(delegateTo, provider, utf8ToHex(endpoint), toHex(dots))
				.send({from: this.subscriber.subscriberOwner, gas, gasPrice})
				.on('transactionHash', (txid: string) => resolve(txid))
				.on('error', (error: any) => reject(error));
		}));
	}
}