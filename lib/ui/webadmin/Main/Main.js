import * as React from 'react';
const style = {
  "root": "zap-extras-webadmin-root",
  "logo": "zap-extras-webadmin-logo",
  "top-nav": "zap-extras-webadmin-top-nav",
  "header": "zap-extras-webadmin-header",
  "main": "zap-extras-webadmin-main",
  "logout": "zap-extras-webadmin-logout",
  "main-container": "zap-extras-webadmin-main-container",
  "main-section": "zap-extras-webadmin-main-section"
}; // @related-file ../webadmin.css

const Address = React.memo(props => React.createElement("div", {
  className: "address"
}, "Address: ", props.children));
const Provider = React.memo(props => React.createElement("div", null, props.children ? 'Found provider: ' + props.children : 'This account is currently not setup as a provider'));
export class Main extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      providerTitle,
      subscriberAddress,
      children
    } = this.props;
    const [menu, mainSection, help] = children;
    return React.createElement(React.Fragment, null, React.createElement("header", {
      className: style['header']
    }, React.createElement(Address, null, subscriberAddress), React.createElement(Provider, null, providerTitle), React.createElement("a", {
      onClick: this.props.handleLogout,
      className: style['logout'],
      title: "Log out"
    })), React.createElement("main", {
      className: style['main']
    }, React.createElement("div", {
      className: style['main-container']
    }, menu, React.createElement("section", {
      className: style['main-section']
    }, mainSection, help))));
  }

}
;