export declare function getPages(currentPage: number, totalPages: number): Array<string | number>;
export declare function getTotalPages(totalItemsLength: number, pageSize: number): number;
export declare function getPageStart(page: number, pageSize: number): number;
export declare function getPageForItem(item: any, allItems: any[], pageSize: any): number;
export declare function parseHash(): {
    page: number;
    expandedAddress: string;
    search: string;
    bonded: boolean;
};
