import * as React from 'react';
export declare class OracleItem extends React.Component<{
    oracle: any;
    expandedAddress: string;
    withBroker: boolean;
}, {
    expanded: boolean;
}> {
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
