import * as React from 'react';
import { OracleCopyIcon } from '../../shared/OracleCopyIcon';
const style = {}; // @related-file ./oracles.css

export const OracleInfo = React.memo(props => React.createElement("div", {
  className: style["oracle-info"]
}, React.createElement("span", null, props.title), React.createElement(OracleCopyIcon, {
  address: props.address
})));