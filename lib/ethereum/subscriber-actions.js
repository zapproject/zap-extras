import { NULL_ADDRESS } from "@zapjs/types";

const {
  utf8ToHex,
  toHex
} = require("web3-utils");

export class SubscriberActions {
  constructor(subscriber) {
    this.subscriber = subscriber;
  }

  async checkBroker(provider, endpoint) {
    const broker = await this.subscriber.zapToken.contract.methods.getEndpointBroker(provider, utf8ToHex(endpoint)).call();

    if (broker !== NULL_ADDRESS && broker !== this.subscriber.subscriberOwner) {
      throw new Error(`Broker address ${broker} needs to call `);
    }
  }

  approve(zap, gas, gasPrice) {
    return new Promise((resolve, reject) => {
      this.subscriber.zapToken.contract.methods.approve(this.subscriber.zapBondage.contract._address, zap.toString()).send({
        from: this.subscriber.subscriberOwner,
        gas,
        gasPrice
      }).on('transactionHash', txid => resolve(txid)).on('error', error => reject(error));
    });
  }

  unbond(provider, endpoint, dots, gas, gasPrice) {
    return this.checkBroker(provider, endpoint).then(() => new Promise((resolve, reject) => {
      this.subscriber.zapBondage.contract.methods.unbond(provider, utf8ToHex(endpoint), toHex(dots)).send({
        from: this.subscriber.subscriberOwner,
        gas,
        gasPrice
      }).on('transactionHash', txid => resolve(txid)).on('error', error => reject(error));
    }));
  }

  bond(provider, endpoint, dots, gas, gasPrice) {
    return this.checkBroker(provider, endpoint).then(() => new Promise((resolve, reject) => {
      this.subscriber.zapBondage.contract.methods.bond(provider, utf8ToHex(endpoint), toHex(dots)).send({
        from: this.subscriber.subscriberOwner,
        gas,
        gasPrice
      }).on('transactionHash', txid => resolve(txid)).on('error', error => reject(error));
    }));
  }

  delegateBond(delegateTo, provider, endpoint, dots, gas, gasPrice) {
    return this.checkBroker(provider, endpoint).then(() => new Promise((resolve, reject) => {
      this.subscriber.zapBondage.contract.methods.delegateBond(delegateTo, provider, utf8ToHex(endpoint), toHex(dots)).send({
        from: this.subscriber.subscriberOwner,
        gas,
        gasPrice
      }).on('transactionHash', txid => resolve(txid)).on('error', error => reject(error));
    }));
  }

}