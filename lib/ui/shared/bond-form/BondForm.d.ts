/// <reference types="react" />
import BigNumber from 'bignumber.js';
import { IFormatPrice } from '../../../ethereum/format-price';
export interface IBondFormProps {
    provider: {
        address: string;
        title: string;
    };
    endpoint: string;
    zap: BigNumber;
    approvedZap?: BigNumber;
    boundDots: number;
    requiredZap: BigNumber;
    onBond: (dots: number) => void;
    onDelegate?: (dots: number, subscriber: string) => void;
    onDotsChange: (dots: number) => void;
    loading?: string;
    error?: string;
    message?: string;
    children: any[];
    approve?: 'suggest' | 'show';
    showApprove?: () => void;
    formatPrice: IFormatPrice;
    txUrl?: string;
}
export declare const BondForm: ({ provider, endpoint, zap, approvedZap, boundDots, requiredZap, onBond, onDelegate, onDotsChange, loading, error, message, children, approve, showApprove, formatPrice, txUrl, }: IBondFormProps) => JSX.Element;
