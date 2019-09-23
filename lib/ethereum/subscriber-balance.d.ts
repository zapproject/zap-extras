import { ZapSubscriber } from '@zapjs/subscriber';
interface Callback {
    (zap: string, allowance: string): void;
}
export declare class SubscriberBalance {
    private subscriber;
    private eventsQueue;
    private updateTimeout;
    zap: string;
    approved: string;
    private eventsSubscriptions;
    constructor(subscriber: ZapSubscriber);
    private handleEvent;
    private notify;
    private updateBalance;
    subscribe(cb: Callback): () => any;
    destroy(): void;
}
export {};
