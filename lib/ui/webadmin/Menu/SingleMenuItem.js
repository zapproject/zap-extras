import * as React from 'react';

const style = require('./menu');

export const SingleMenuItem = React.memo(({
  item,
  active
}) => !!item.exclude ? null : React.createElement("div", null, !!item.disabled ? React.createElement("a", {
  className: "disabled"
}, item.title) : React.createElement("a", {
  className: active ? style['active'] : undefined,
  href: '#' + item.name
}, item.title)));