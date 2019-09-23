import * as React from 'react';
import BigNumber from 'bignumber.js';
import { Message } from '../message/Message';
import { Loading } from '../loading/Loading';
import { TransactionInfo } from '../transaction-info/TransactionInfo';
import { IFormatPrice } from '../../../ethereum/format-price';

const style = require('./bond-form.css');

export interface IBondFormProps {
	provider: {address: string; title: string};
	endpoint: string;
	zap: BigNumber,
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
export const BondForm = ({
	provider,
	endpoint,
	zap,
	approvedZap,
	boundDots,
	requiredZap,
	onBond,
	onDelegate,
	onDotsChange,
	loading,
	error,
	message,
	children,
	approve,
	showApprove,
	formatPrice,
	txUrl,
}: IBondFormProps) => {

	const [dots, setDots] = React.useState(1);
	const [delegate, setDelegate] = React.useState('');

	const handleDotsChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const dots = Number(e.target.value);
		setDots(dots);
		onDotsChange(dots);
	}, []);

	const handleDelegateChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setDelegate(e.target.value.trim());
	}, []);

	const handleBondClick = React.useCallback(() => {
		if (!!delegate) {
			onDelegate(dots, delegate);
		} else {
			onBond(dots);
		}
	}, []);

	// const needApprove = React.useMemo(() => approvedZap.lt(requiredZap), [approvedZap, requiredZap]);

	const balanceInsufficent = zap.lt(requiredZap);

	return (
		<div className={style.root}>

			<div className="bond-provider">{provider.title} - {provider.address}</div>
			<div className="bond-endpoint">{endpoint}</div>

			{!!error && <Message type="error">{error}</Message>}
			{!!loading && <Loading>{loading}</Loading>}
			{!!message && <Message type="success">{message}</Message>}
			{!!txUrl && <div>
				<Message type="success">Bonded to endpoint</Message>}
				<TransactionInfo txUrl={txUrl} />
			</div>}

			{approvedZap != null && <p>You have approved {formatPrice(approvedZap.toNumber())}</p>}

			<fieldset disabled={!!loading}>
				<div className="form-group">
					<label htmlFor="dots">You have {boundDots} DOTs bound. How many would you like to bond?</label>
					<input type="number" value={dots} onChange={handleDotsChange} />
				</div>
			</fieldset>

			{requiredZap !== null && <div>
				<p>This will require {formatPrice(requiredZap.toNumber())}</p>
				{balanceInsufficent && <Message type="error">Balance insufficent.</Message>}
			</div>}

			<div className={`${style['bond-approve-wrapper']} ${style['bond-approve-wrapper--' + approve]}`}>

				{approve === 'show' && <div className={style['approve-wrapper']}>
					{children}
				</div>}

				{approve === 'suggest' && <div className={style['approve-suggest']}>
					<button type="button" onClick={showApprove}>Approve</button>
				</div>}

				<fieldset disabled={!!approve || !!loading || balanceInsufficent}>
					{!!onDelegate && <div className="form-group">
						<label>Delegate to (optional)</label>
						<input type="text" value={delegate} onChange={handleDelegateChange} placeholder="Subscriber Address"/>
					</div>}
					<div className="form-group">
						<button type="button" onClick={handleBondClick}>{!!delegate ? 'Delegate bond' : 'Bond'}</button>
					</div>
				</fieldset>

			</div>
		</div>
	);
};
