import * as React from 'react';
import { SingleMenuItem } from './SingleMenuItem';
const style = {
  "root": "zap-extras-menu-root",
  "active": "zap-extras-menu-active",
  "foldable": "zap-extras-menu-foldable",
  "foldable-items": "zap-extras-menu-foldable-items",
  "expanded": "zap-extras-menu-expanded",
  "foldable-title": "zap-extras-menu-foldable-title"
}; // @related-file ./menu.css

export const ExpandedMenuItem = React.memo(({
  item,
  expanded,
  handleExpandClick,
  active
}) => React.createElement("div", {
  className: `${style['foldable']} ${expanded ? style['expanded'] : ''}`
}, React.createElement("a", {
  href: "#",
  onClick: handleExpandClick,
  "data-expand": item.name,
  className: style['foldable-title']
}, item.title), React.createElement("div", {
  className: style['foldable-items']
}, item.items.map(item => React.createElement(SingleMenuItem, {
  key: item.name + item.title,
  item: item,
  active: item.name === active
})))));