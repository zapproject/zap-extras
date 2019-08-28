import * as React from 'react';
interface Props {
    pages: Array<string | number>;
    currentPage: string | number;
    search: string;
    withBroker: boolean;
}
export declare const OraclesPagination: React.MemoExoticComponent<({ pages, currentPage, search, withBroker }: Props) => JSX.Element>;
export {};
