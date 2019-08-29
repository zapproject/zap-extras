import * as React from 'react';
import { ViewItem } from './Menu';
interface Props {
    item: ViewItem;
    expanded: boolean;
    active: string;
    handleExpandClick: (e: any) => void;
}
export declare const ExpandedMenuItem: React.MemoExoticComponent<({ item, expanded, handleExpandClick, active }: Props) => JSX.Element>;
export {};
