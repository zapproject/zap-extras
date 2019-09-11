import * as React from 'react';
import { Message } from '../shared/message/Message';
import { Loading } from '../shared/loading/Loading';

const style = require('./webadmin.css');

interface Props {
	provider: any;
	subscriber: any;
	loading: string;
	error: string;
	title: string;
	children: any;
}


function getInnerConent(provider, loading, error, subscriber, main, login) {
	if (provider && subscriber && !loading && !error) return main;
	if (loading) return <Loading>{loading}</Loading>;
	return (
	<React.Fragment>
		<Message type="error">{error}</Message>
		{login}
	</React.Fragment>
	);
}


export function WebAdmin(props: Props) {
	const [ main, login ] = props.children;
	const { provider, loading, error, subscriber, title } = props;

	React.useEffect(() => {
		document.title = title;
	}, ['title'])

	return (
		<div className={style['root']}>
			<div className={style['top-nav']}>
				<img src="assets/logo.png" className={style['logo']} /><h1>{title}</h1>
			</div>
			<div>
				{getInnerConent(provider, loading, error, subscriber, main, login)}
			</div>
		</div>
	);
}
