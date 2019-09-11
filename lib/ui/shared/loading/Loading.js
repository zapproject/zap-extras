import * as React from 'react';
const style = {
  "loading-content": "zap-extras-loading-loading-content",
  "loading-indicator": "zap-extras-loading-loading-indicator"
}; // @related-file ./loading.css

export const Loading = React.memo(props => React.createElement(React.Fragment, null, React.createElement("div", {
  className: style["loading-content"]
}, props.children), React.createElement("div", {
  className: style["loading-indicator"]
})));