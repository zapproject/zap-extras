import * as React from 'react';
import { Message } from '../shared/message/Message';
import { Loading } from '../shared/loading/Loading';
const style = {
  "root": "zap-extras-webadmin-root",
  "logo": "zap-extras-webadmin-logo",
  "top-nav": "zap-extras-webadmin-top-nav",
  "header": "zap-extras-webadmin-header",
  "main": "zap-extras-webadmin-main",
  "logout": "zap-extras-webadmin-logout",
  "main-container": "zap-extras-webadmin-main-container",
  "main-section": "zap-extras-webadmin-main-section"
}; // @related-file ./webadmin.css

function getInnerConent(provider, loading, error, subscriber, main, login) {
  if (provider && subscriber && !loading && !error) return main;
  if (loading) return React.createElement(Loading, null, loading);
  return React.createElement(React.Fragment, null, React.createElement(Message, {
    type: "error"
  }, error), login);
}

export function WebAdmin(props) {
  const [main, login] = props.children;
  const {
    provider,
    loading,
    error,
    subscriber,
    title
  } = props;
  React.useEffect(() => {
    document.title = title;
  }, ['title']);
  return React.createElement("div", {
    className: style['root']
  }, React.createElement("div", {
    className: style['top-nav']
  }, React.createElement("img", {
    src: "assets/logo.png",
    className: style['logo']
  }), React.createElement("h1", null, title)), React.createElement("div", null, getInnerConent(provider, loading, error, subscriber, main, login)));
}