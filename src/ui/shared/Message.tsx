import * as React from 'react';

export const Message = React.memo((props: {children: any, type: 'error' | 'success'}) =>
  props.children ? <div className={'message message-' + props.type}>{props.children}</div> : null);