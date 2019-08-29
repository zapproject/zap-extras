import { ZapProvider } from '@zapjs/provider';
import { TokenDotFactory } from '@zapjs/tokendot';
export declare class ProvidersService {
    private networkId;
    private networkProvider;
    private web3;
    private registry;
    private bondage;
    private endpointsPromise;
    private allOraclesPromise;
    private allProviderAddressesPromise;
    private allEndpointsWithBrokerPromise;
    constructor(networkId: any, networkProvider: any, web3: any);
    private readonly allEndpointWithBroker;
    private readonly allEndpoints;
    readonly allProviders: Promise<ZapProvider[]>;
    readonly currentProvider: any;
    readonly allProvidersWithTitles: Promise<ZapProvider[]>;
    readonly allProviderAddresses: Promise<string[]>;
    private providersWithTitles;
    getProvidersWithTitles(withBroker?: boolean, emptyProviders?: boolean): Promise<ZapProvider[]>;
    getProviderEndpoints(provider: ZapProvider, withBroker?: boolean): Promise<string[]>;
    private isBrokerProvider;
    private getBrokerEndpoints;
    /**
     * Returns the list of sorted by bound dots providers with endpoints from Bound event.
     * Could return not all providers
     */
    private getProvidersByBoundDots;
    private updateProvidersData;
    private updateEndpoints;
    loadProvider(owner: string): ZapProvider;
    loadTokenDotFactoryAndProvider(address?: string): {
        tokenDotFactory: TokenDotFactory;
        tokenProvider: ZapProvider;
    };
    private getBoundDots;
    getProvidersBonded(account: any, search?: any): Promise<{
        items: Array<{
            provider: ZapProvider;
            endpoints: string[];
            dots: number[];
        }>;
        total: number;
    }>;
    getProviders(start: number, withBroker: any, limit?: number, skipProvidersWithoutEndpoints?: boolean): Promise<{
        items: Array<{
            provider: ZapProvider;
            endpoints: string[];
        }>;
        total: number;
    }>;
    private static getEndpointsByOracleAddress;
    search(text: any, start: number, withBroker: any, limit?: number, skipProvidersWithoutEndpoints?: boolean): Promise<{
        items: Array<{
            provider: ZapProvider;
            endpoints: string[];
        }>;
        total: number;
    }>;
    readonly networkOptions: {
        networkId: any;
        networkProvider: any;
        handler: {
            handleIncoming: (data: string) => void;
            handleUnsubscription: (data: string) => void;
            handleSubscription: (data: string) => void;
        };
    };
}
export declare function getIndexByAddress(providers: any, address: any): number;
export declare function getByAddress(providers: any, address: any): any;
