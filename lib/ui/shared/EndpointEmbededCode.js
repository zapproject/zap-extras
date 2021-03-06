function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
const styleEmbedded = {
  "root": "zap-extras-endpoint-embeded-code-root"
}; // @related-file ./endpoint-embeded-code.css

const styleOracles = {
  "root": "zap-extras-oracle-address-copy-root",
  "copied": "zap-extras-oracle-address-copy-copied"
}; // @related-file ./oracle-address-copy.css

export class EndpointEmbededCode extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "textareaRef", React.createRef());
  }

  get embedDev() {
    const {
      provider,
      endpoint
    } = this.props;
    return `<zap-bond-widget address="${provider}" endpoint="${endpoint}"></zap-bond-widget>
<script defer src="https://unpkg.com/zap-bond-widget@latest"></script>`;
  }

  handleCopy(e) {
    e.preventDefault();
    this.textareaRef.current.focus();
    this.textareaRef.current.select();
    document.execCommand('copy');
  }

  componentDidMount() {
    this.textareaRef.current.setSelectionRange(0, this.textareaRef.current.value.length);
    this.textareaRef.current.focus();
  }

  render() {
    return React.createElement("div", {
      className: styleEmbedded['root']
    }, React.createElement("textarea", {
      ref: this.textareaRef,
      defaultValue: this.embedDev,
      readOnly: true
    }), React.createElement("a", {
      className: styleOracles['root'],
      title: "Copy",
      onClick: e => this.handleCopy(e)
    }));
  }

}