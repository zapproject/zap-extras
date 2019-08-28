import * as React from 'react';
interface Props {
    provider: string;
    endpoint: string;
}
export declare class EndpointEmbededCode extends React.PureComponent<Props> {
    private textareaRef;
    private readonly embedDev;
    handleCopy(e: any): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
