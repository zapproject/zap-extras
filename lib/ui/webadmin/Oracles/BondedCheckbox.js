import * as React from 'react';
const style = {
  "oracle-item": "Oracles_oracles__oracle-item",
  "endpoint-item": "Oracles_oracles__endpoint-item",
  "endpoint-name": "Oracles_oracles__endpoint-name",
  "endpoint-dots": "Oracles_oracles__endpoint-dots",
  "endpoint-values": "Oracles_oracles__endpoint-values",
  "curve-chart": "Oracles_oracles__curve-chart",
  "endpoint-info": "Oracles_oracles__endpoint-info",
  "endpoints-count": "Oracles_oracles__endpoints-count",
  "expanded": "Oracles_oracles__expanded",
  "oracles-filter": "Oracles_oracles__oracles-filter",
  "form-group": "Oracles_oracles__form-group",
  "label": "Oracles_oracles__label"
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