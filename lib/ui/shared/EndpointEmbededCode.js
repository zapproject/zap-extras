function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
const styleEmbedded = {
  "oracle-embeded-code": "_oracle-embeded-code_1ejv0_1"
}; // @related-file ./endpoint-embeded-code.css

const styleOracles = {
  "oracle-address-copy": "_oracle-address-copy_171t5_1",
  "copied": "_copied_171t5_22"
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
      className: styleEmbedded["oracle-embeded-code"]
    }, React.createElement("textarea", {
      ref: this.textareaRef,
      defaultValue: this.embedDev,
      readOnly: true
    }), React.createElement("a", {
      className: styleOracles["oracle-address-copy"],
      title: "Copy",
      onClick: e => this.handleCopy(e)
    }));
  }

}