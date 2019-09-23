import * as React from 'react';
const style = {
  "root": "zap-extras-oracles-pagination-root",
  "active": "zap-extras-oracles-pagination-active"
}; // @related-file ./oracles-pagination.css

export const OraclesPagination = ({
  totalPages,
  currentPage,
  urlTemplate,
  onPageClick
}) => React.createElement("ul", {
  className: style['root']
}, getPages(currentPage, totalPages).map((page, index) => React.createElement("li", {
  key: '' + index + page,
  className: page === currentPage ? style['active'] : ''
}, React.createElement("a", {
  onClick: page === '...' || page === currentPage ? null : onPageClick,
  href: page === '...' || page === currentPage ? null : urlTemplate(page)
}, page))));

function getPages(currentPage, totalPages) {
  const delta = 2;
  const left = currentPage - delta;
  const right = currentPage + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || i >= left && i < right) {
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
}

;