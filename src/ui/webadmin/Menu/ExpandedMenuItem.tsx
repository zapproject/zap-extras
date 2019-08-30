import * as React from 'react';
import { ViewItem } from './Menu';
import { SingleMenuItem } from './SingleMenuItem';

const style = require('./menu.css');

interface Props {
  item: ViewItem;
  expanded: boolean;
  active: string;
  handleExpandClick: (e: any) => void;
}

export const ExpandedMenuItem = React.memo(({item, expanded, handleExpandClick, active}: Props) => (
  <div className={`${style['foldable']} ${(expanded ? style['expanded'] : '')}`}>
    <a href='#' onClick={handleExpandClick} data-expand={item.name} className={style['foldable-title']}>
      {item.title}
    </a>
    <div className={style['foldable-items']}>
      {item.items.map(item => <SingleMenuItem key={item.name+item.title} item={item} active={item.name === active} />)}
    </div>
  </div>
));
