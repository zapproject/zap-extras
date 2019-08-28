import * as React from 'react';
export declare class OraclesSearch extends React.PureComponent<{
    bonded: any;
    bondedChange: any;
    defaultValue: string;
    onChange: (e: any) => void;
    disabled: boolean;
}, {
    value: string;
}> {
    timeout: any;
    constructor(props: any);
    componentDidUpdate(prevProps: any): void;
    onChange(e: any): void;
    emit(): void;
    render(): JSX.Element;
}
