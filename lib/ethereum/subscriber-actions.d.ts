import { ZapSubscriber } from "@zapjs/subscriber";
export declare class SubscriberActions {
    private subscriber;
    constructor(subscriber: ZapSubscriber);
    private checkBroker;
    approve(zap: string, gas: number, gasPrice: string): Promise<unknown>;
    unbond(provider: string, endpoint: string, dots: number, gas: number, gasPrice: string): Promise<unknown>;
    bond(provider: string, endpoint: string, dots: number, gas: number, gasPrice: string): Promise<unknown>;
    delegateBond(delegateTo: string, provider: string, endpoint: string, dots: number, gas: number, gasPrice: string): Promise<unknown>;
}
