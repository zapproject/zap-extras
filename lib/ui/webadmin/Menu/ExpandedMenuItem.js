import * as React from 'react';
import { SingleMenuItem } from './SingleMenuItem';
const style = {
  "menu": "_menu_1k13e_1",
  "active": "_active_1k13e_16",
  "menu__foldable": "_menu__foldable_1k13e_22",
  "menu__foldable-items": "_menu__foldable-items_1k13e_22",
  "expanded": "_expanded_1k13e_26",
  "menu__foldable-title": "_menu__foldable-title_1k13e_34"
}; // @related-file ./menu.css

export const ExpandedMenuItem = React.memo(({
  item,
  expanded,
  handleExpandClick,
  active
}) => React.createElement("div", {
  className: `${style['menu__foldable']} ${expanded ? style['expanded'] : ''}`
}, React.createElement("a", {
  href: "#",
  onClick: handleExpandClick,
  "data-expand": item.name,
  className: style['menu__foldable-title']
}, item.title), React.createElement("div", {
  className: style['menu__foldable-items']
}, item.items.map(item => React.createElement(SingleMenuItem, {
  key: item.name + item.title,
  item: item,
  active: item.name === active
})))));