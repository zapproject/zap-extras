import * as React from 'react';
const style = require('./oracles-pagination.css');

interface Props {
	urlTemplate: (page: string | number) => string;
	totalPages: number;
	currentPage: number;
	onPageClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const OraclesPagination = ({totalPages, currentPage, urlTemplate, onPageClick}: Props) => (
	<ul className={style['root']}>
		{getPages(currentPage, totalPages).map((page, index) => <li key={'' + index + page} className={page === currentPage ? style['active'] : ''}>
			<a
				onClick={page === '...' || page === currentPage ? null : onPageClick}
				href={page === '...' || page === currentPage ? null : urlTemplate(page)}
			>
				{page}
			</a>
		</li>)}
	</ul>
);

function getPages(currentPage: number, totalPages: number): Array<string | number> {
	const delta = 2;
	const left = currentPage - delta;
	const right = currentPage + delta + 1;
	const range = [];
	const rangeWithDots: Array<string | number> = [];
	let l: number;
	for (let i = 1; i <= totalPages; i++) {
		if ((i === 1 || i === totalPages) || (i >= left && i < right)) {
			range.push(i);
		}
	}
	for (let i of range) {
		if (l) {
			if (i - l === 2) {
				rangeWithDots.push(l + 1);
			} else if (i - l !== 1) {
				rangeWithDots.push('...');
			}
		}
		rangeWithDots.push(i);
		l = i;
	}
	return rangeWithDots;
};
