import * as React from 'react';
import { ViewsEnum } from '../views.enum';
const style = {}; // @related-file ./pagination.css

export const OraclesPagination = React.memo(({
  pages,
  currentPage,
  search,
  withBroker
}) => React.createElement("ul", {
  className: `${style['oracles-pagination']} to-white`
}, pages.map((page, index) => React.createElement("li", {
  key: '' + index + page,
  className: page === currentPage ? style['active'] : ''
}, React.createElement("a", {
  href: `#${withBroker ? ViewsEnum.TOKEN_PROVIDERS_LIST : ViewsEnum.ORACLES};search=${search};page=${page}`
}, page)))));