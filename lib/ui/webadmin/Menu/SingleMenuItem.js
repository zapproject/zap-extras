import * as React from 'react';
const style = {
  "root": "zap-extras-menu-root",
  "active": "zap-extras-menu-active",
  "foldable": "zap-extras-menu-foldable",
  "foldable-items": "zap-extras-menu-foldable-items",
  "expanded": "zap-extras-menu-expanded",
  "foldable-title": "zap-extras-menu-foldable-title"
}; // @related-file ./menu.css

export const SingleMenuItem = React.memo(({
  item,
  active
}) => !!item.exclude ? null : React.createElement("div", null, !!item.disabled ? React.createElement("a", {
  className: "disabled"
}, item.title) : React.createElement("a", {
  className: active ? style['active'] : undefined,
  href: '#' + item.name
}, item.title)));