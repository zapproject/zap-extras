import * as React from 'react';
interface State {
    prices: Array<{
        name: string;
        value: string;
        wait: string;
    }>;
}
interface Props {
    value: string;
    onSelect: (value: string) => void;
}
export declare class GasPriceSelect extends React.PureComponent<Props, State> {
    state: {
        prices: any[];
    };
    componentDidMount(): void;
    getEstimateGasPrice(): void;
    render(): JSX.Element;
}
export {};
