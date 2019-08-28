import * as React from 'react';
const style = {}; // @related-file ./oracles.css

export const BondedCheckbox = React.memo(props => {
  return React.createElement("label", {
    className: style.label
  }, "Bonded ", React.createElement("input", {
    type: "checkbox",
    checked: props.bonded,
    onChange: props.change
  }));
});