function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
const style = {
  "oracle-address-copy": "_oracle-address-copy_171t5_1",
  "copied": "_copied_171t5_22"
}; // @related-file ./oracle-address-copy.css

export class OracleCopyIcon extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      copy: 0
    });

    _defineProperty(this, "textareaRef", React.createRef());

    _defineProperty(this, "timeout", void 0);

    this.handleCopy = this.handleCopy.bind(this);
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  handleCopy(e) {
    e.preventDefault();
    this.setState({
      copy: 1
    }, () => {
      this.textareaRef.current.focus();
      this.textareaRef.current.select();
      document.execCommand('copy');
      this.setState({
        copy: 2
      });
      setTimeout(() => {
        this.setState({
          copy: 0
        });
      }, 800);
    });
  }

  render() {
    const className = (this.state.copy === 2 ? style['copied'] : '') + ' ' + style['oracle-address-copy'];
    return React.createElement("a", {
      className: className,
      href: "#",
      title: this.props.address,
      onClick: this.handleCopy
    }, this.state.copy === 1 && React.createElement("textarea", {
      ref: this.textareaRef,
      defaultValue: this.props.address
    }));
  }

}