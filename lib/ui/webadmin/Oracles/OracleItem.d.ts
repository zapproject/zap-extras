import * as React from 'react';
interface Props {
    oracle: any;
    expandedAddress: string;
    baseUrl: string;
    onEndpointClick: (endpoinst: any) => void;
}
interface State {
    expanded: boolean;
}
export declare class OracleItem extends React.Component<Props, State> {
    state: {
        expanded: boolean;
    };
    ref: React.RefObject<HTMLDivElement>;
    readonly animate: number;
    readonly expanded: boolean;
    readonly endpoint: string;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidUpdate(prevProps: any): void;
    render(): JSX.Element;
}
export {};
