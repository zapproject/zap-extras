import * as React from 'react';
interface Props {
    oracles: any[];
    expandedAddress: any;
    baseUrl: string;
    onEndpointClick: (endpoinst: any) => void;
}
export declare const OraclesList: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export {};
