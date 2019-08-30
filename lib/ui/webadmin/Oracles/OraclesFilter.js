function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { BondedCheckbox } from './BondedCheckbox';
const style = {
  "oracle-item": "zap-extras-oracles-oracle-item",
  "endpoint-item": "zap-extras-oracles-endpoint-item",
  "endpoint-name": "zap-extras-oracles-endpoint-name",
  "endpoint-dots": "zap-extras-oracles-endpoint-dots",
  "endpoint-values": "zap-extras-oracles-endpoint-values",
  "curve-chart": "zap-extras-oracles-curve-chart",
  "endpoint-info": "zap-extras-oracles-endpoint-info",
  "endpoints-count": "zap-extras-oracles-endpoints-count",
  "expanded": "zap-extras-oracles-expanded",
  "oracles-filter": "zap-extras-oracles-oracles-filter",
  "form-group": "zap-extras-oracles-form-group",
  "label": "zap-extras-oracles-label"
}; // @related-file ./oracles.css

export class OraclesSearch extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "timeout", void 0);

    this.state = {
      value: props.defaultValue
    };
    this.onChange = this.onChange.bind(this);
    this.emit = this.emit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultValue !== this.props.defaultValue && !this.timeout && this.state.value !== this.props.defaultValue) {
      this.setState({
        value: this.props.defaultValue
      });
    }
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.emit();
      this.timeout = null;
    }, 300);
  }

  emit() {
    this.props.onChange(this.state.value);
  }

  render() {
    const props = {
      disabled: this.props.disabled,
      onChange: this.onChange,
      value: this.state.value
    };
    return React.createElement("div", {
      className: style['oracles-filter']
    }, React.createElement("div", {
      className: style["form-group"]
    }, React.createElement("input", _extends({
      onBlur: this.emit,
      placeholder: "Search by address or name",
      type: "text"
    }, props))), this.props.bondedChange != null && React.createElement(BondedCheckbox, {
      bonded: this.props.bonded,
      change: this.props.bondedChange
    }));
  }

}