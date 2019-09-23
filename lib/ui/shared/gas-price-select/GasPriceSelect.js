function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
const style = {
  "gas-price-select": "zap-extras-gas-price-select-gas-price-select",
  "gas-price": "zap-extras-gas-price-select-gas-price",
  "gas-price-selected": "zap-extras-gas-price-select-gas-price-selected"
}; // @related-file ./gas-price-select.css

export class GasPriceSelect extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      prices: []
    });
  }

  componentDidMount() {
    this.getEstimateGasPrice();
  }

  getEstimateGasPrice() {
    fetch('https://ethgasstation.info/json/ethgasAPI.json').then(response => response.json()).then(json => {
      this.setState({
        prices: [{
          name: 'Fastest',
          value: '' + json.fastest,
          wait: json.fastestWait
        }, {
          name: 'Fast',
          value: '' + json.fast,
          wait: json.fastWait
        }, {
          name: 'Average',
          value: '' + json.average,
          wait: json.avgWait
        }, {
          name: 'Safe Low',
          value: '' + json.safeLow,
          wait: json.safeLowWait
        }]
      });
      this.props.onSelect('' + json.average);
    });
  }

  render() {
    const {
      prices
    } = this.state;
    const {
      onSelect,
      value
    } = this.props;
    return React.createElement("div", {
      className: style['gas-price-select']
    }, prices.map(price => React.createElement("button", {
      type: "button",
      className: (value === price.value ? style['gas-price-selected'] : '') + ' ' + style['gas-price'],
      onClick: () => onSelect(price.value),
      key: price.name + price.value
    }, React.createElement("div", null, price.name), React.createElement("div", null, "~ ", price.wait, " sec"), React.createElement("div", null, price.value, " Gwei"))));
  }

}