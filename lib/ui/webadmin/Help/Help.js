import * as React from 'react';
const style = {
  "help-icon": "zap-extras-help-help-icon",
  "help-popup": "zap-extras-help-help-popup"
}; // @related-file ./help.css

export class Help extends React.PureComponent {
  render() {
    if (!this.props.children) return null;
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: style['help-icon']
    }), React.createElement("div", {
      className: style['help-popup'],
      dangerouslySetInnerHTML: {
        __html: this.props.children
      }
    }));
  }

}