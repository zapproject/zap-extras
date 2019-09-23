import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Loading } from './Loading';

import './loading.css';

const stories = storiesOf('Loading', module);

stories.add('Loading w/o text', () => {
	return (
		<Loading></Loading>
	);
});

stories.add('Loading w/ text', () => {
	return (
		<Loading>Loading data ...</Loading>
	);
});
