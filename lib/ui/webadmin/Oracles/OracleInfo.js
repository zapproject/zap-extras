import * as React from 'react';
import { OracleCopyIcon } from '../../shared/OracleCopyIcon';
const style = {
  "oracle-item": "_oracle-item_bdlin_1",
  "endpoint-item": "_endpoint-item_bdlin_9",
  "endpoint-name": "_endpoint-name_bdlin_14",
  "endpoint-dots": "_endpoint-dots_bdlin_20",
  "endpoint-values": "_endpoint-values_bdlin_28",
  "curve-chart": "_curve-chart_bdlin_36",
  "endpoint-info": "_endpoint-info_bdlin_40",
  "endpoints-count": "_endpoints-count_bdlin_46",
  "expanded": "_expanded_bdlin_69",
  "oracles-filter": "_oracles-filter_bdlin_73",
  "form-group": "_form-group_bdlin_79",
  "label": "_label_bdlin_88"
}; // @related-file ./oracles.css

export const OracleInfo = React.memo(props => React.createElement("div", {
  className: style["oracle-info"]
}, React.createElement("span", null, props.title), React.createElement(OracleCopyIcon, {
  address: props.address
})));