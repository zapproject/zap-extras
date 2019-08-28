import * as React from 'react';
export const Message = React.memo(props => props.children ? React.createElement("div", {
  className: 'message message-' + props.type
}, props.children) : null);