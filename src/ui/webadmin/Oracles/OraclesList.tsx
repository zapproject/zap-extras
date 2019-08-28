import * as React from 'react';
import { OracleItem } from './OracleItem';

export const OraclesList = React.memo((props: {oracles: any[]; expandedAddress: any; withBroker: boolean}) => (
  <div className="oracles-list">
    {props.oracles.map(oracle =>
      <OracleItem
        withBroker={props.withBroker}
        expandedAddress={props.expandedAddress}
        key={oracle.address} oracle={oracle} />
    )}
  </div>
));
