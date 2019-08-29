import * as React from 'react';
import { ExpandedMenuItem } from './ExpandedMenuItem';
import { SingleMenuItem } from './SingleMenuItem';
const style = {
  "menu": "_menu_1k13e_1",
  "active": "_active_1k13e_16",
  "menu__foldable": "_menu__foldable_1k13e_22",
  "menu__foldable-items": "_menu__foldable-items_1k13e_22",
  "expanded": "_expanded_1k13e_26",
  "menu__foldable-title": "_menu__foldable-title_1k13e_34"
}; // @related-file ./menu.css

export class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick(e) {
    e.preventDefault();
    const expanded = e.target.getAttribute('data-expand');
    this.setState({
      expanded: this.state.expanded === expanded ? null : expanded
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.view === prevProps.view) return;
    const {
      view,
      items
    } = this.props;
    let expanded = this.state.expanded;

    for (let item of items) {
      if (!item.items) continue;

      for (let subitem of item.items) {
        if (subitem.name === view) {
          expanded = item.name;
          break;
        }
      }
    }

    if (expanded === this.state.expanded) return;
    this.setState({
      expanded
    });
  }

  render() {
    const {
      view,
      items
    } = this.props;
    const expanded = this.state.expanded;
    return React.createElement("div", {
      className: style['menu']
    }, items.map(item => {
      const active = item.name === view;
      return !item.items ? React.createElement(SingleMenuItem, {
        key: item.name + item.title,
        item: item,
        active: active
      }) : React.createElement(ExpandedMenuItem, {
        key: item.name + item.title,
        item: item,
        expanded: expanded === item.name,
        active: view,
        handleExpandClick: this.handleExpandClick
      });
    }));
  }

}