import * as React from 'react';
const style = require('./pagination.css');

interface Props {
  pages: Array<string | number>;
  currentPage: string | number;
  search: string;
  baseUrl: string;
}

export const OraclesPagination = React.memo(({pages, currentPage, search, baseUrl}: Props) => (
  <ul className={`${style['oracles-pagination']} to-white`}>
    {pages.map((page, index) => <li key={'' + index + page} className={page === currentPage ? style['active'] : ''}>
      <a href={`${baseUrl};search=${search};page=${page}`}>{page}</a>
    </li>)}
  </ul>
));
