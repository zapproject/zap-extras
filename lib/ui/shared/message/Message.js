import * as React from 'react';
const style = {
  "root": "zap-extras-message-root",
  "success": "zap-extras-message-success",
  "error": "zap-extras-message-error"
}; // @related-file ./message.css

export const Message = props => props.children ? React.createElement("div", {
  className: `${style['root']} ${style[props.type]}`
}, props.children) : null;