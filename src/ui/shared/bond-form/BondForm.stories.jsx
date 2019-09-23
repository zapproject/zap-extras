import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BigNumber from 'bignumber.js';
import { BondForm } from './BondForm';
import { formatPrice } from '../../../ethereum/format-price';

import './bond-form.css';

const stories = storiesOf('BondForm', module);

// addDecorator(storyFn => <div style={{ textAlign: 'center' }}>{storyFn()}</div>);

// const Container = (props) => <div style={{width: '600px'}}>{props.children}</div>;

stories.add('BondForm', () => {
	return (
		<BondForm
			provider={{address: '0x23423414214', title: 'some provider'}}
			endpoint="someendpoint"
			zap={BigNumber(123)}
			approvedZap={BigNumber(1)}
			boundDots={1}
			requiredZap={null}
			onBond={dots => console.log(dots)}
			onDelegate={((dots, subscriber) => console.log(dots, subscriber))}
			onDotsChange={(dots) => console.log(dots)}
			loading=""
			error=""
			message=""
			approve={null}
			showApprove={() => {}}
			formatPrice={formatPrice}
			txUrl=""
		>
		</BondForm>
	);
}, {
	decorators: [
		storyFn => <div style={{ width: '600px' }}>{storyFn()}</div>
	]
});
