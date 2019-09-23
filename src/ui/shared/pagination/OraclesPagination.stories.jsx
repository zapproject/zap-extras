import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { OraclesPagination } from './OraclesPagination';

import './oracles-pagination.css';

const stories = storiesOf('OraclesPagination', module);

const Container = (props) => <div style={{width: '500px', backgroundColor: '#999'}}>{props.children}</div>;

stories.add('OraclesPagination', () => {
	const totalPages = 20;
	const [currentPage, setCurrentPage] = React.useState(1);
	const urlTemplate = (page) => `#someurl;page=${page}`;
	function onPageClick(e) {
		e.preventDefault();
		setCurrentPage(Number(e.target.textContent));
	}
	const props = {totalPages, currentPage, urlTemplate, onPageClick};
	return (
		<Container>
			<OraclesPagination {...props} />
		</Container>
	);
});
