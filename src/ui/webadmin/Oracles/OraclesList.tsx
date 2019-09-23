import * as React from 'react';
import { OracleItem } from './OracleItem';

interface Props {
  oracles: any[];
  expandedAddress: any;
  baseUrl: string;
  onEndpointClick: (endpoinst: any) => void;
}

export const OraclesList = (props: Props) => (
  <div className="oracles-list">
    {props.oracles.map(oracle =>
      <OracleItem
        baseUrl={props.baseUrl}
        onEndpointClick={props.onEndpointClick}
        expandedAddress={props.expandedAddress}
        key={oracle.address} oracle={oracle} />
    )}
  </div>
);
