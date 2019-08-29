import * as React from 'react';
const style = {
  "message": "_message_269zq_1",
  "message-success": "_message-success_269zq_10",
  "message-error": "_message-error_269zq_15"
}; // @related-file ./message.css

export const Message = React.memo(props => props.children ? React.createElement("div", {
  className: `${style['message']} ${style['message-' + props.type]}`
}, props.children) : null);