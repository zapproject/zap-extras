import * as React from 'react';
const style = {
  "root": "zap-extras-oracles-pagination-root",
  "active": "zap-extras-oracles-pagination-active"
}; // @related-file ./oracles-pagination.css

export const OraclesPagination = React.memo(({
  pages,
  currentPage,
  search,
  baseUrl
}) => React.createElement("ul", {
  className: style['root']
}, pages.map((page, index) => React.createElement("li", {
  key: '' + index + page,
  className: page === currentPage ? style['active'] : ''
}, React.createElement("a", {
  href: `${baseUrl};search=${search};page=${page}`
}, page)))));