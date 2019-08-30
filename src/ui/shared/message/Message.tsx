import * as React from 'react';

const style = require('./message.css');

export const Message = React.memo((props: {children: any, type: 'error' | 'success'}) =>
  props.children
    ? <div className={`${style['root']} ${style[props.type]}`}>
        {props.children}
      </div>
    : null
);