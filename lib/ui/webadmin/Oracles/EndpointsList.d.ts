/// <reference types="react" />
interface Props {
    endpoints: any[];
    baseUrl: string;
    onEndpointClick: (endpoinst: any) => void;
}
export declare const EndpointsList: (props: Props) => JSX.Element;
export {};
