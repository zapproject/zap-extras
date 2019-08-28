import * as React from 'react';
import { OracleCopyIcon } from '../../shared/OracleCopyIcon';
const style = require('./oracles.css');

export const OracleInfo = React.memo((props: {title: string, address: string}) => (
  <div className={style["oracle-info"]}>
    <span>{props.title}</span>
    <OracleCopyIcon address={props.address}></OracleCopyIcon>
  </div>
));
