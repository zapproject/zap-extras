import * as React from 'react';
import { ViewItem } from "./Menu";

const style = require('./menu');

export const SingleMenuItem = React.memo(({item, active}: {item: ViewItem; active: boolean}) => (
  !!item.exclude ? null :
  <div>
    {!!item.disabled
      ? <a className="disabled">{item.title}</a>
      : <a className={active ? style['active'] : undefined} href={'#' + item.name}>{item.title}</a>}
  </div>
));
