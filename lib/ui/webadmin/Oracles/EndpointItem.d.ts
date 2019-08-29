import * as React from 'react';
interface Props {
    endpoint: any;
    baseUrl: string;
    onEndpointClick: (endpoinst: any) => void;
}
export declare const EndpointItem: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export {};
