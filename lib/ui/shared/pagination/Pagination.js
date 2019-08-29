import * as React from 'react';
const style = {
  "oracles-pagination": "_oracles-pagination_8ho1d_8",
  "active": "_active_8ho1d_34"
}; // @related-file ./pagination.css

export const OraclesPagination = React.memo(({
  pages,
  currentPage,
  search,
  baseUrl
}) => React.createElement("ul", {
  className: `${style['oracles-pagination']} to-white`
}, pages.map((page, index) => React.createElement("li", {
  key: '' + index + page,
  className: page === currentPage ? style['active'] : ''
}, React.createElement("a", {
  href: `${baseUrl};search=${search};page=${page}`
}, page)))));