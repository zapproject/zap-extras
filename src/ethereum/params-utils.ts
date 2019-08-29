import { hexToAddress, isIpfsAddress, addressToHex } from './ipfs-utils';
import { utf8ToHex, hexToUtf8 } from 'web3-utils';
import { ZapProvider } from '@zapjs/provider/lib/src';
import { txid, DEFAULT_GAS } from '@zapjs/types';

export function decodeParam(hex: string): string {
	if (hex.indexOf('0x') !== 0) return hex;
	try {
		return hexToUtf8(hex);
	} catch (e) {
		console.log(e);
	}
	try {
		const address = hexToAddress(hex.replace('0x', ''));
		if (isIpfsAddress(address)) return address;
	} catch (e) {
		console.log(e);
	}
	return hex;
}

export function encodeParam(input: string): string {
	if (isIpfsAddress(input)) return '0x' + addressToHex(input);
	return input.startsWith('0x') ? input : utf8ToHex(input);
}

export function getUrlText(url: string): Promise<string> {
	return Promise.race([
		fetch(isIpfsAddress(url) ? 'https://cloudflare-ipfs.com/ipfs/' + url : url),
		new Promise((_, reject) => { setTimeout(() => { reject(new Error('Request timeout.')); }, 2000); }),
	]).then((response: any) => response.text());
}

export function formatJSON(json: string, tab = 4): string {
	return JSON.stringify(JSON.parse(json), null, tab);
}


/**
 * Returns a provider paramater
 * @param provider ZapProvider
 * @param key utf8 string
 */
export function getProviderParam(provider: ZapProvider, key: string): Promise<string> {

	console.log('key ', key);
	console.log('utf8ToHex ', utf8ToHex(key));
	return provider.zapRegistry.contract.methods.getProviderParameter(provider.providerOwner, utf8ToHex(key)).call().then(decodeParam);
}

/**
* Sets provider paramater
* @param provider ZapProvider
* @param key utf8 string
* @param param string or hex
*/
export function setProviderParam(provider: ZapProvider, key: string, param): Promise<txid> {
return provider.zapRegistry.contract.methods.setProviderParameter(utf8ToHex(key), encodeParam(param))
	.send({from: provider.providerOwner, gas: DEFAULT_GAS});
}

/**
* Returns an array of params
* @param provider ZapProvider
* @param endpoint utf8 string
*/
export function getEndpointParams(provider: ZapProvider, endpoint: string): Promise<string[]> {
return provider.getEndpointParams(endpoint).then((params: any) => params.map(decodeParam));
}

/**
* Sets endpoints params
* @param provider ZapProvider
* @param endpoint utf8 string
* @param params array of strings or hex
*/
export function setEndpointParams(provider: any, endpoint: string, params: string[]): Promise<txid>{

	console.log('subscriber params ', params);
	const encodedParams = params.map(encodeParam);
	console.log('subscriber params ', encodedParams);
	return provider.setEndpointParams({endpoint: endpoint, endpoint_params: encodedParams});
}

export function loadProviderParams(provider, endpoint) {
	return Promise.all([
		getProviderParam(provider, endpoint + '.md').then(getUrlText).catch(e => { console.log(e); return ''; }),
		getProviderParam(provider, endpoint + '.json').then(getUrlText).catch(e => { console.log(e); return ''; }),
	]).catch(console.error);
}
