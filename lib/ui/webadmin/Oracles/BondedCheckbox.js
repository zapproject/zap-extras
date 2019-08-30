import * as React from 'react';
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

export const BondedCheckbox = React.memo(props => {
  return React.createElement("label", {
    className: style.label
  }, "Bonded ", React.createElement("input", {
    type: "checkbox",
    checked: props.bonded,
    onChange: props.change
  }));
});