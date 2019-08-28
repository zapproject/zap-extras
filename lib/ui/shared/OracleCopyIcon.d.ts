import * as React from 'react';
export declare class OracleCopyIcon extends React.PureComponent<{
    address: string;
}, {
    copy: number;
}> {
    state: {
        copy: number;
    };
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    timeout: number;
    constructor(props: any);
    componentWillUnmount(): void;
    handleCopy(e: any): void;
    render(): JSX.Element;
}
