import * as React from 'react';
const style = require("./oracles.css");

export const BondedCheckbox = (props: {bonded: boolean; change: (e: any) => void}) => {
  return <label className={style.label}>Bonded <input type="checkbox" checked={props.bonded} onChange={props.change} /></label>
};
