import { ZapRegistry } from '@zapjs/registry';
import { ZapProvider } from '@zapjs/provider';
import { ZapBondage } from '@zapjs/bondage';
import { TokenDotFactory } from '@zapjs/tokendot';
import { Artifacts } from '@zapjs/artifacts';
const { utf8ToHex, hexToUtf8 } = require('web3-utils');

const restrictedAddresses = [
  '0xaD0Adf0C81E9c18D5DE0D6D5555A909c6435062D',
  '0x2416002D127175BC2d627FAefdaA4186c7c49833',
  '0x47834a7533Eb6CB6F8ca1677405423e476cE3f31',
  '0x6Be845635029C8C8F44bc8d729624d0c41adCcDE',
  '0xf108237201E6EE3906f19390C699dA4d1495040F',
];

export class ProvidersService {
  private registry: ZapRegistry;
  private bondage: ZapBondage;
  private endpointsPromise: Promise<Array<{provider: string; endpoints: string[]}>>;
  private allOraclesPromise: Promise<ZapProvider[]>;
  private allProviderAddressesPromise: Promise<string[]>;

  private allEndpointsWithBrokerPromise: Promise<Endpoint[]>;

  constructor(private networkId, private networkProvider, private web3) {
    this.registry = new ZapRegistry(this.networkOptions);
    this.bondage = new ZapBondage(this.networkOptions);
    this.updateProvidersData();
    this.registry.listenNewProvider({}, () => { this.updateProvidersData(); });
    this.registry.listenNewCurve({}, () => { this.updateProvidersData(); });
  }

  private get allEndpointWithBroker() {
    return this.allEndpointsWithBrokerPromise;
  }

  private get allEndpoints(): Promise<Array<{provider: string; endpoints: string[]}>> {
    return this.endpointsPromise;
  }

  get allProviders(): Promise<ZapProvider[]> {
    return this.allOraclesPromise;
  }

  get currentProvider() {
    return this.networkProvider;
  }

  get allProvidersWithTitles(): Promise<ZapProvider[]> {
    return this.allProviders.then(providers => this.providersWithTitles(providers));
  }

  get allProviderAddresses(): Promise<string[]> {
    return this.allProviderAddressesPromise;
  }

  /* get allAddresses(): Promise<string[]> {
    return this.registry.getAllProviders() as Promise<string[]>;
  } */

  private async providersWithTitles(providers: ZapProvider[]): Promise<ZapProvider[]> {
    await Promise.all(providers.filter(provider => !provider.title).map((provider: ZapProvider) => provider.getTitle()));
    return providers;
  }

  /* private async getBrokerProviders(withBroker: boolean): Promise<string[]> {
    const providers: string[] = [];
    const endpoints = await this.allEndpointWithBroker;
    let i = endpoints.length;
    while (i--) {
      const isBroker = endpoints[i].broker === '0x0000000000000000000000000000000000000000';
      if (withBroker && !isBroker) continue;
      if (!withBroker && isBroker) continue;
      if (providers.indexOf(endpoints[i].provider) !== -1) continue;
      providers.push(endpoints[i].provider);
    }
    return providers;
  } */

  public async getProvidersWithTitles(withBroker = false, emptyProviders = false): Promise<ZapProvider[]> {
    const providers = await this.allProvidersWithTitles;
    if (!withBroker) return providers;
    const [providerAddressesFromBrokerEndpoints, providerAddressesFromEndpoints] = await Promise.all([
      this.allEndpointWithBroker.then(endpoints => endpoints.map(e => e.provider)),
      this.allEndpoints.then(endpoints => endpoints.filter(e => e.endpoints.length > 0).map(e => e.provider)),
    ]);
    return providers.filter(provider => {
      const hasBorkerEndpoint = providerAddressesFromBrokerEndpoints.indexOf(provider.providerOwner) !== -1;
      const hasEndpoint = providerAddressesFromEndpoints.indexOf(provider.providerOwner) !== -1;
      return emptyProviders ? (hasBorkerEndpoint || !hasEndpoint) : hasBorkerEndpoint;
    });
  }

  public async getProviderEndpoints(provider: ZapProvider, withBroker = false): Promise<string[]> {
    const endpoints = await provider.getEndpoints();
    if (!withBroker) return endpoints;
    const brokerEndpoints = await this.allEndpointWithBroker.then(endpoints => endpoints.filter(e => e.provider === provider.providerOwner).map(e => e.endpoint));
    return brokerEndpoints;
  }

  private isBrokerProvider(provider: ZapProvider, endpoints: string[], allBrokerEndpoints: Endpoint[]): {provider: ZapProvider; brokerEndpoints: string[]; nonBrokerEndpoints: string[]} {
    const providerBrokerEndpoints = allBrokerEndpoints.filter(e => e.provider === provider.providerOwner).map(e => e.endpoint);
    const nonBrokerEndpoints = [];
    const brokerEndpoints = [];
    endpoints.forEach(e => {
      const isBrokerEndpoint = providerBrokerEndpoints.indexOf(e) !== -1;
      (isBrokerEndpoint ? brokerEndpoints : nonBrokerEndpoints).push(e);
    });
    return {provider, nonBrokerEndpoints, brokerEndpoints};
  }

  private async getBrokerEndpoints(): Promise<Array<Endpoint>> {
    const endpoints: Array<{provider: string; endpoint: string; numDots: number}> = await this.registry.contract.getPastEvents('NewCurve', {
      fromBlock: 0,
      toBlock: 'latest',
    }).then(events => events.filter(filterCurveEventWithBroker).map(formatCurveEvent));
    return endpoints;
  }

  /**
   * Returns the list of sorted by bound dots providers with endpoints from Bound event.
   * Could return not all providers
   */
  private async getProvidersByBoundDots(): Promise<Array<{address: string; endpoints: Endpoint[]}>> {
    const endpointsWithDots: Array<{address: string; endpoints: Endpoint[]}> = await this.bondage.contract.getPastEvents('Bound', {
      fromBlock: 0,
      toBlock: 'latest',
    }).then(events => groupEndpointsByProvider(combineBondEvents(events.map(formatBondEvent)).sort(sortByNumDots)));
    return endpointsWithDots;
  }

  /* private async getAllProvidersWithEndpointsSorted(): Promise<Array<{address: string; endpoints: Endpoint[]}>> {
    const [sortedEndpointsWithDots, allEndpoints] = await Promise.all([
      this.getEndpointsByBoundDots(),
      this.getAllEndpoints(),
    ]);
    const providers = groupEndpointsByProvider(combineAllEndpoints(sortedEndpointsWithDots, allEndpoints));
    console.log('getAllProvidersWithEndpointsSorted', providers);
    return providers;
  } */

  private updateProvidersData() {
    const sortedProvidersPromise = this.getProvidersByBoundDots();
    this.allProviderAddressesPromise = Promise.all([
      (this.registry.getAllProviders() as Promise<string[]>) .then(addresses => addresses.filter(address => restrictedAddresses.indexOf(address) === -1)),
      sortedProvidersPromise,
    ]).then(([allProviders, providersSortedByDots]) => {
      // get some providers with known numDots and sort them
      return sortItemsByNumDots(allProviders, providersSortedByDots, 'address');
    });
    // do not load titles for providers on the first run, only when requested
    this.allOraclesPromise = this.allProviderAddresses.then(providerAddresses => Promise.all(providerAddresses.map(address => this.loadProvider(address))));
    this.endpointsPromise = Promise.all([this.allProviders, sortedProvidersPromise]).then(([providers, sortedProviders]) => this.updateEndpoints(providers, sortedProviders));
    this.allEndpointsWithBrokerPromise = this.getBrokerEndpoints();
  }

  private async updateEndpoints(providers: ZapProvider[], sortedProvidersWithEndpoints): Promise<Array<{provider: string; endpoints: string[]}>> {
    const endpoints: string[][] = await Promise.all(providers.map(provider => provider.getEndpoints()));
    return providers.map((provider, index) => {
      const sortedProvider = getByAddress(sortedProvidersWithEndpoints, provider.providerOwner);
      return {
        provider: provider.providerOwner,
        endpoints: sortItemsByNumDots(endpoints[index], sortedProvider ? sortedProvider.endpoints : [], 'endpoint')
      };
    });
  }

  loadProvider(owner: string): ZapProvider {
    return new ZapProvider(owner, this.networkOptions);
  }

  loadTokenDotFactoryAndProvider(address?: string) {
    const tokenDotFactory = new TokenDotFactory(this.networkOptions);
    if (address) {
      const artifact = Artifacts['TOKENDOTFACTORY'];
      tokenDotFactory.contract = new this.web3.eth.Contract(artifact.abi, address);
    }
    const tokenProvider = this.loadProvider(tokenDotFactory.contract._address);
    return {
      tokenDotFactory,
      tokenProvider,
    };
  }

  private getBoundDots(account: string, provider: string, endpoints: string[]): Promise<number[]> {
    return Promise.all(endpoints.map(endpoint => this.bondage.contract.methods.getBoundDots(account, provider, utf8ToHex(endpoint)).call().then(Number)));
  }

  async getProvidersBonded(account, search?): Promise<{items: Array<{provider: ZapProvider; endpoints: string[]; dots: number[]}>; total: number}> {
    const providersWithEndpoint: Array<{address: string; endpoints: Endpoint[]}> = await this.bondage.contract.getPastEvents('Bound', {
      filter: {holder: account},
      fromBlock: 0,
      toBlock: 'latest',
    }).then(eventes => combineBondEvents(eventes.map(formatBondEvent))).then(groupEndpointsByProvider);
    const providers = providersWithEndpoint.map(provider => this.loadProvider(provider.address));
    // load titles and bound dots in parallel
    const [_, allDots] = await Promise.all([
      this.providersWithTitles(providers),
      Promise.all(providersWithEndpoint.map(provider => this.getBoundDots(account, provider.address, provider.endpoints.map(e => e.endpoint)))),
    ]);
    const filterEndpointsWithDotsByDots = endpointWithDots => endpointWithDots.dots > 0;
    const filterEndpointsWithDotsBySearch = endpointWithDots => endpointWithDots.endpoint.indexOf(search) !== -1;
    const sortEndpointsWithDots = (endpointWithDotsA, endpointWithDotsB) => endpointWithDotsB.dots - endpointWithDotsA.dots;
    const items: Array<{provider: ZapProvider; endpoints: string[]; dots: number[]}> = [];
    providers.forEach((provider, providerIndex) => {
      const allEndpointsWithDots: Array<{endpoint: string; dots: number}> = providersWithEndpoint[providerIndex].endpoints.map(e => e.endpoint)
        .map((endpoint, endpointIndex) => ({
          endpoint,
          dots: allDots[providerIndex][endpointIndex],
        }))
        .filter(filterEndpointsWithDotsByDots)
        .sort(sortEndpointsWithDots);
      const searchEndpointsWithDots = search ? allEndpointsWithDots.filter(filterEndpointsWithDotsBySearch) : [];
      // if no endpoint match the search, but provider matches, show all it's endpoints
      const endpointsWithDots = searchEndpointsWithDots.length ? searchEndpointsWithDots : allEndpointsWithDots;
      if (
        !!search
        && !searchEndpointsWithDots.length
        && provider.title.toLocaleLowerCase().indexOf(search) === -1
        && provider.providerOwner.toLocaleLowerCase().indexOf(search) === -1
      ) return;
      const dots = [];
      const endpoints = [];
      for (let i = 0, len = endpointsWithDots.length; i < len; i++) {
        dots.push(endpointsWithDots[i].dots);
        endpoints.push(endpointsWithDots[i].endpoint);
      }
      items.push({ provider, endpoints, dots });
    });
    return {
      items,
      total: items.length,
    }
  }

  // TODO: For backend service return provider address and provider title only instead of provider
  async getProviders(start = 0, withBroker, limit?: number, skipProvidersWithoutEndpoints = false): Promise<{items: Array<{provider: ZapProvider, endpoints: string[]}>, total: number}> {
    const [allProviders, allEndpoints, brokerEndpoints] = await Promise.all([
      this.allProviders,
      this.allEndpoints,
      this.allEndpointWithBroker,
    ]);
    const providersWithEndpoints = allProviders.map(provider => ({provider, endpoints: ProvidersService.getEndpointsByOracleAddress(allEndpoints, provider.providerOwner)}));
    const providersWithBrokerEndpoints = providersWithEndpoints.map(e => this.isBrokerProvider(e.provider, e.endpoints, brokerEndpoints));
    const providers: Array<ZapProvider> = [];
    const endpoints: string[][] = []
    providersWithBrokerEndpoints.forEach(e => {
      if (withBroker && e.brokerEndpoints.length) {
        providers.push(e.provider);
        endpoints.push(e.brokerEndpoints);
      }
      if (!withBroker && (e.nonBrokerEndpoints.length || (!e.nonBrokerEndpoints.length && !e.brokerEndpoints.length))) {
        if (skipProvidersWithoutEndpoints && e.nonBrokerEndpoints.length === 0) return;
        providers.push(e.provider);
        endpoints.push(e.nonBrokerEndpoints);
      }
    });
    // only get title for requested providers
    const pageProviders = await this.providersWithTitles(limit ? providers.slice(start, start + limit) : providers.slice(start));
    const pageEndpoints = limit ? endpoints.slice(start, start + limit) : endpoints.slice(start)
    return {
      items: pageProviders.map((provider, index) => {
        return {provider, endpoints: pageEndpoints[index]};
      }),
      total: providers.length,
    };
  }

  private static getEndpointsByOracleAddress(endpoints: Array<{provider: string; endpoints: string[]}>, address: string) {
    let i = endpoints.length;
    while (i--) {
      if (endpoints[i].provider === address) return endpoints[i].endpoints;
    }
    return [];
  }

  // TODO: For backend service return provider address and provider title only instead of provider
  async search(text, start = 0, withBroker, limit?: number, skipProvidersWithoutEndpoints = false): Promise<{items: Array<{provider: ZapProvider, endpoints: string[]}>, total: number}> {
    if (!text.length) this.getProviders(start, withBroker, limit);
    await this.allProviders;
    const [allEndpoints, providers] = await Promise.all([
      this.allEndpoints,
      this.allProvidersWithTitles, // for search we need titles of all providers
    ]);
    const filteredOracles: Array<{provider: ZapProvider, endpoints: string[]}> = [];
    providers.forEach(provider => {
      const allProviderEndpoints = ProvidersService.getEndpointsByOracleAddress(allEndpoints, provider.providerOwner)
      const searchEndpoints = allProviderEndpoints.filter(endpoint => endpoint.toLowerCase().indexOf(text) !== -1);
      // if no endpoint match the search, but provider matches, show all it's endpoints
      const endpoints = searchEndpoints.length ? searchEndpoints : allProviderEndpoints;
      if (
        !searchEndpoints.length
        && provider.title.toLocaleLowerCase().indexOf(text) === -1
        && provider.providerOwner.toLocaleLowerCase().indexOf(text) === -1
      ) return;
      if (skipProvidersWithoutEndpoints && endpoints.length === 0) return;
      filteredOracles.push({
        provider,
        endpoints,
      });
    });
    return {
      items: limit ? filteredOracles.slice(start, start + limit) : filteredOracles.slice(start),
      total: filteredOracles.length,
    };
  }

  get networkOptions() {
    const handler = {
      handleIncoming: (data: string) => {
        console.log('handleIncoming', data);
      },
      handleUnsubscription: (data: string) => {
        console.log('handleUnsubscription', data);
      },
      handleSubscription: (data: string) => {
        console.log('handleSubscription', data);
      },
    };
    return { networkId: this.networkId, networkProvider: this.networkProvider, handler };
  }
}


function filterCurveEventWithBroker({returnValues}) {
  return returnValues.broker && returnValues.broker !== '0x0000000000000000000000000000000000000000';
}

function formatCurveEvent({returnValues}): Endpoint {
  let endpoint: string;
  try {
    endpoint = hexToUtf8(returnValues.endpoint);
  } catch (e) {
    endpoint = returnValues.endpoint;
  }
  return {
    endpoint,
    provider: returnValues.provider as string,
    broker: returnValues.broker as string,
    curve: returnValues.curve as string[],
    numDots: 0,
  };
}

function sortItemsByNumDots(allItems, itemsWithDots, returnField): string[] {
  const items: string[] = [];
  for (let i = 0, len = itemsWithDots.length; i < len; i++) {
    const provider = itemsWithDots[i];
    if (allItems.indexOf(provider[returnField]) === -1) continue;
    items.push(provider[returnField]);
  }
  for (let i = 0, len = allItems.length; i < len; i++) {
    const provider = allItems[i];
    if (items.indexOf(provider) !== -1) continue;
    items.push(provider);
  }
  return items;
}


function formatBondEvent({returnValues}): {endpoint: string; provider: string, numDots: number} {
  return {
    endpoint: hexToUtf8(returnValues.endpoint) as string,
    provider: returnValues.oracle as string,
    numDots: Number(returnValues.numDots),
  };
}

function groupEndpointsByProvider(endpoints: Array<Endpoint>): Array<{address: string; numDots: number; endpoints: Endpoint[]}> {
  const providers: Array<{address: string; numDots: number; endpoints: Endpoint[]}> = [];
  const len = endpoints.length;
  for (let i = 0; i < len; i++) {
    const endpoint = endpoints[i];
    const index = getIndexByAddress(providers, endpoint.provider);
    if (index !== -1) {
      providers[index].endpoints.push(endpoint);
      providers[index].numDots += endpoint.numDots;
      continue;
    }
    providers.push({
      address: endpoint.provider,
      endpoints: [endpoint],
      numDots: endpoint.numDots,
    });
  }
  return providers.sort(sortByNumDots);
}

export function getIndexByAddress(providers, address) {
  return getIndexBy(providers, address, 'address');

}
export function getByAddress(providers, address) {
  return providers[getIndexBy(providers, address, 'address')];
}

function getIndexBy(items: any[], value: any, field: string): number {
  let i = items.length;
  while (i--) {
    if (items[i][field] === value) return i;
  }
  return -1;
}

function getEndpointByProviderAndEndpoint(endpoints: Endpoint[], endpoint: string, provider: string): Endpoint | null {
  let i = endpoints.length;
  while (i--) {
    if (endpoints[i].endpoint === endpoint && endpoints[i].provider === provider) return endpoints[i];
  }
  return null;
}

function combineBondEvents(events: Endpoint[]): Endpoint[] {
  const endpoints: Endpoint[] = [];
  let i = events.length;
  while (i--) {
    const endpoint = getEndpointByProviderAndEndpoint(endpoints, events[i].endpoint, events[i].provider);
    if (endpoint) {
      endpoint.numDots += events[i].numDots;
    } else {
      endpoints.push({
        endpoint: events[i].endpoint,
        provider: events[i].provider,
        curve: events[i].curve,
        numDots: events[i].numDots,
      });
    }
  }
  return endpoints;
}

function sortByNumDots(a: {numDots: number}, b: {numDots: number}): number {
  return b.numDots - a.numDots;
}

/* function combineAllEndpoints(sortedEndpointsWithDots: Endpoint[], endpointsWithCurve: Endpoint[]): Endpoint[] {
  const endpoints = sortedEndpointsWithDots.filter(endpoint => !getEndpointByProviderAndEndpoint(endpointsWithCurve, endpoint.endpoint, endpoint.provider));
  for (let i = 0, len = endpoints.length; i < len; i++) {
    const endpoint = getEndpointByProviderAndEndpoint(endpoints, endpointsWithCurve[i].endpoint, endpointsWithCurve[i].provider);
    if (!endpoint) {
      endpoints.push(endpointsWithCurve[i]);
      continue;
    }
    endpoints[i] = {
      endpoint: endpoints[i].endpoint,
      provider: endpoints[i].provider,
      curve: endpoint.curve,
      numDots: endpoints[i].numDots,
    };
  }
  return endpoints;
} */

interface Endpoint {
  endpoint: string;
  provider: string;
  broker?: string;
  numDots: number;
  curve?: string[];
}
