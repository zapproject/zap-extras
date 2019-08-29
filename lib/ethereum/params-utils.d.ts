import { ZapProvider } from '@zapjs/provider/lib/src';
import { txid } from '@zapjs/types';
export declare function decodeParam(hex: string): string;
export declare function encodeParam(input: string): string;
export declare function getUrlText(url: string): Promise<string>;
export declare function formatJSON(json: string, tab?: number): string;
/**
 * Returns a provider paramater
 * @param provider ZapProvider
 * @param key utf8 string
 */
export declare function getProviderParam(provider: ZapProvider, key: string): Promise<string>;
/**
* Sets provider paramater
* @param provider ZapProvider
* @param key utf8 string
* @param param string or hex
*/
export declare function setProviderParam(provider: ZapProvider, key: string, param: any): Promise<txid>;
/**
* Returns an array of params
* @param provider ZapProvider
* @param endpoint utf8 string
*/
export declare function getEndpointParams(provider: ZapProvider, endpoint: string): Promise<string[]>;
/**
* Sets endpoints params
* @param provider ZapProvider
* @param endpoint utf8 string
* @param params array of strings or hex
*/
export declare function setEndpointParams(provider: any, endpoint: string, params: string[]): Promise<txid>;
export declare function loadProviderParams(provider: any, endpoint: any): Promise<void | [string, string]>;
