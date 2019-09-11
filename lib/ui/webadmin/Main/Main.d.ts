import * as React from 'react';
interface Props {
    handleLogout: () => void;
    providerTitle: string;
    subscriberAddress: string;
}
interface State {
}
export declare class Main extends React.PureComponent<Props, State> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
