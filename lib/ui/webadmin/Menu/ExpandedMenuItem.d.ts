/// <reference types="react" />
import { ViewItem } from './Menu';
interface Props {
    item: ViewItem;
    expanded: boolean;
    active: string;
    handleExpandClick: (e: any) => void;
}
export declare const ExpandedMenuItem: ({ item, expanded, handleExpandClick, active }: Props) => JSX.Element;
export {};
