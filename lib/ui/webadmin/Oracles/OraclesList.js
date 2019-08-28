import * as React from 'react';
import { OracleItem } from './OracleItem';
export const OraclesList = React.memo(props => React.createElement("div", {
  className: "oracles-list"
}, props.oracles.map(oracle => React.createElement(OracleItem, {
  withBroker: props.withBroker,
  expandedAddress: props.expandedAddress,
  key: oracle.address,
  oracle: oracle
}))));