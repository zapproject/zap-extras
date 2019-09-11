import * as React from 'react';
const style = require('./loading.css');

export const Loading = React.memo((props: {children: string | any}) => <React.Fragment>
  <div className={style["loading-content"]}>{props.children}</div>
  <div className={style["loading-indicator"]}></div>
</React.Fragment>);
