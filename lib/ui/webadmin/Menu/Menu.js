import * as React from 'react';
import { ExpandedMenuItem } from './ExpandedMenuItem';
import { SingleMenuItem } from './SingleMenuItem';
import { MenuMobileSwitcher } from './MenuMobileSwitcher';
const style = {
  "root": "zap-extras-menu-root",
  "active": "zap-extras-menu-active",
  "foldable": "zap-extras-menu-foldable",
  "foldable-items": "zap-extras-menu-foldable-items",
  "expanded": "zap-extras-menu-expanded",
  "foldable-title": "zap-extras-menu-foldable-title",
  "mobile-menu-switcher": "zap-extras-menu-mobile-menu-switcher",
  "mobile-menu-switcher_opened": "zap-extras-menu-mobile-menu-switcher_opened"
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
    return React.createElement(React.Fragment, null, React.createElement(MenuMobileSwitcher, null), React.createElement("aside", {
      className: style['root']
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
    })));
  }

}