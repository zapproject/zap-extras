import * as React from 'react';
interface Props {
    urlTemplate: (page: string | number) => string;
    totalPages: number;
    currentPage: number;
    onPageClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
export declare const OraclesPagination: ({ totalPages, currentPage, urlTemplate, onPageClick }: Props) => JSX.Element;
export {};
