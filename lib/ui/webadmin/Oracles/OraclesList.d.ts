/// <reference types="react" />
interface Props {
    oracles: any[];
    expandedAddress: any;
    baseUrl: string;
    onEndpointClick: (endpoinst: any) => void;
}
export declare const OraclesList: (props: Props) => JSX.Element;
export {};
