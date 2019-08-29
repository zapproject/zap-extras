import * as React from 'react';
export interface ViewItem {
    title: string;
    disabled?: boolean;
    exclude?: boolean;
    items?: ViewItem[];
    name: string;
}
interface Props {
    providerTitle: string;
    view: string;
    items: ViewItem[];
}
interface State {
    expanded: string;
}
export declare class Menu extends React.PureComponent<Props, State> {
    constructor(props: any);
    handleExpandClick(e: any): void;
    componentDidUpdate(prevProps: any): void;
    render(): JSX.Element;
}
export {};
