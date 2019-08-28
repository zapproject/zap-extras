import * as React from 'react';
import { EndpointItem } from './EndpointItem';

export const EndpointsList = (props: {endpoints: any[]; withBroker: boolean}) => (
  <div className="endpoints-list">
    {props.endpoints.map(endpoint => <EndpointItem key={endpoint.name} withBroker={props.withBroker} endpoint={endpoint}></EndpointItem>)}
  </div>
);