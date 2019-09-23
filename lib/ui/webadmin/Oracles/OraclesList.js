import * as React from 'react';
import { OracleItem } from './OracleItem';
export const OraclesList = props => React.createElement("div", {
  className: "oracles-list"
}, props.oracles.map(oracle => React.createElement(OracleItem, {
  baseUrl: props.baseUrl,
  onEndpointClick: props.onEndpointClick,
  expandedAddress: props.expandedAddress,
  key: oracle.address,
  oracle: oracle
})));