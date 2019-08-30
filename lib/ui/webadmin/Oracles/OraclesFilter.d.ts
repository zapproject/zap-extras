import * as React from 'react';
interface Props {
    bonded?: any;
    bondedChange?: any;
    defaultValue: string;
    onChange: (e: any) => void;
    disabled: boolean;
}
interface State {
    value: string;
}
export declare class OraclesSearch extends React.PureComponent<Props, State> {
    timeout: any;
    constructor(props: any);
    componentDidUpdate(prevProps: any): void;
    onChange(e: any): void;
    emit(): void;
    render(): JSX.Element;
}
export {};
