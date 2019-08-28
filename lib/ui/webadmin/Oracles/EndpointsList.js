import * as React from 'react';
import { EndpointItem } from './EndpointItem';
export const EndpointsList = props => React.createElement("div", {
  className: "endpoints-list"
}, props.endpoints.map(endpoint => React.createElement(EndpointItem, {
  key: endpoint.name,
  withBroker: props.withBroker,
  endpoint: endpoint
})));