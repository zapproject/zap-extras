import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { OracleItem } from './OracleItem';
import { Curve } from '@zapjs/curve';

const style = require('../webadmin.css');
import './oracles.css';

const stories = storiesOf('OracleItem', module);

const endpoints = [
	{
		curve: new Curve([1, 1, 10000000000]),
		dotsBounded: 321312312,
		dotsIssued: 1234670,
		name: 'IEX',
		provider: '0x81e1361f6FaDdC5E0C6361601C7e598B7592A45f',
	},
	{
		curve: new Curve([1, 1, 10000000000]),
		dotsBounded: 123,
		dotsIssued: 1234670,
		name: 'IEX2',
		provider: '0x81e1361f6FaDdC5E0C6361601C7e598B7592A45f',
	},
];

const oracle = {
	endpoints,
	title: 'Title',
	address: '0x81e1361f6FaDdC5E0C6361601C7e598B7592A45f',
}

const Webadmin = (props) => <div className={style.root}>{props.children}</div>;

const Container = (props) => <div style={{
	width: '500px',
	// color: '#fff',
	// backgroundColor: '#282c34',
}}>{props.children}</div>;

stories.add('OracleItem', () =>
	<Webadmin>
		<Container>
			<OracleItem
				baseUrl="#VIEW_ORACLES"
				oracle={oracle}
				expandedAddress="0x81e1361f6FaDdC5E0C6361601C7e598B7592A45f"
				onEndpointClick={() => {}}
				/>
		</Container>
	</Webadmin>,
	{ info: { inline: true } }
);
