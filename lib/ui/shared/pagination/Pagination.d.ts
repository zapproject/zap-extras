import * as React from 'react';
interface Props {
    pages: Array<string | number>;
    currentPage: string | number;
    search: string;
    baseUrl: string;
}
export declare const OraclesPagination: React.MemoExoticComponent<({ pages, currentPage, search, baseUrl }: Props) => JSX.Element>;
export {};
