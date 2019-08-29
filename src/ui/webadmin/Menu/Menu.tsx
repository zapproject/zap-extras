import * as React from 'react';
import { ExpandedMenuItem } from './ExpandedMenuItem';
import { SingleMenuItem } from './SingleMenuItem';

const style = require('./menu.css');

export interface ViewItem {
  title: string;
  disabled?: boolean;
  exclude?: boolean;
  items?: ViewItem[];
  name: string;
}

interface Props {
  providerTitle: string;
	view: string;
	items: ViewItem[],
}

interface State {
  expanded: string;
}

export class Menu extends React.PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {expanded: null};
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }
  handleExpandClick(e) {
    e.preventDefault();
    const expanded: string = e.target.getAttribute('data-expand');
    this.setState({
      expanded: this.state.expanded === expanded ? null : expanded,
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.view === prevProps.view) return;
		const {view, items} = this.props;
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
    this.setState({expanded});
  }
  render() {
    const {view, items} = this.props;
    const expanded = this.state.expanded;
    return (
      <div className={style['menu']}>
        {items.map(item => {
          const active = item.name === view;
          return !item.items
            ? <SingleMenuItem key={item.name+item.title} item={item} active={active} />
            : <ExpandedMenuItem
                key={item.name+item.title}
                item={item}
                expanded={expanded === item.name}
                active={view}
                handleExpandClick={this.handleExpandClick} />
        })}
      </div>
    );
  }
}