import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Message } from './Message';

import './message.css';

const stories = storiesOf('Message', module);

const Container = (props) => <div style={{width: '500px'}}>{props.children}</div>;

stories.add('Message default', () => {
	return (
			<Container>
				<Message>Some message</Message>
			</Container>

	);
	},
	{ info: { inline: true } }
);
stories.add('Message success', () => {
	return (
			<Container>
				<Message type="success">Success</Message>
			</Container>

	);
	},
	{ info: { inline: true } }
);
stories.add('Message error', () => {
	return (
			<Container>
				<Message type="error">Error</Message>
			</Container>

	);
	},
	{ info: { inline: true } }
);
