import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { GasPriceSelect } from './GasPriceSelect';

import './gas-price-select.css';

const stories = storiesOf('GasPriceSelect', module);

const Container = (props) => <div style={{width: '500px'}}>{props.children}</div>;

stories.add('GasPriceSelect', () => {
	const [value, setValue] = React.useState('200');
	return (
		<Container>
			<GasPriceSelect
				value={value}
				onSelect={setValue}
				/>
		</Container>
	);
});
