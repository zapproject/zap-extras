import * as React from 'react';
import { EndpointItem } from './EndpointItem';

interface Props {
  endpoints: any[];
  baseUrl: string;
  onEndpointClick: (endpoinst: any) => void;
}

export const EndpointsList = (props: Props) => (
  <div className="endpoints-list">
    {props.endpoints.map(endpoint =>
      <EndpointItem
        key={endpoint.name}
        baseUrl={props.baseUrl}
        onEndpointClick={props.onEndpointClick}
        endpoint={endpoint} />
      )
    }
  </div>
);