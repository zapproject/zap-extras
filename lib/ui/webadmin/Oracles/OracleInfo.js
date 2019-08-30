import * as React from 'react';
import { OracleCopyIcon } from '../../shared/OracleCopyIcon';
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

export const OracleInfo = React.memo(props => React.createElement("div", {
  className: style["oracle-info"]
}, React.createElement("span", null, props.title), React.createElement(OracleCopyIcon, {
  address: props.address
})));