import * as React from 'react';
import { ViewsEnum } from '../views.enum';
const style = require('./pagination.css');

interface Props {
  pages: Array<string | number>;
  currentPage: string | number;
  search: string;
  withBroker: boolean;
}

export const OraclesPagination = React.memo(({pages, currentPage, search, withBroker}: Props) => (
  <ul className={`${style['oracles-pagination']} to-white`}>
    {pages.map((page, index) => <li key={'' + index + page} className={page === currentPage ? style['active'] : ''}>
      <a href={`#${withBroker ? ViewsEnum.TOKEN_PROVIDERS_LIST: ViewsEnum.ORACLES};search=${search};page=${page}`}>{page}</a>
    </li>)}
  </ul>
));
