import * as React from 'react';
import { CurveChart } from '../../shared/CurveChart';
import { EndpointEmbededCode } from '../../shared/EndpointEmbededCode';
import { Curve } from '@zapjs/curve/lib/src';
import { parseHash } from '../../shared/pagination/utils';
import { ViewsEnum } from '../../shared/views.enum';
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

export const EndpointItem = React.memo(props => {
  const {
    endpoint,
    withBroker
  } = props;
  const hash = parseHash();
  const link = `#${withBroker ? ViewsEnum.TOKEN_PROVIDERS_LIST : ViewsEnum.ORACLES};search=${hash.search};page=${hash.page};bonded=${hash.bonded ? 'true' : ''};oracle=` + endpoint.provider + endpoint.name;
  const equation = !!endpoint.curve ? Curve.curveToString(endpoint.curve.values) : '';

  const navigeteToEndpointInfo = () => {
    setTimeout(() => {
      location.href = '#' + (withBroker ? ViewsEnum.TOKEN_BONDAGE : ViewsEnum.GET_ENDPOINT) + ';' + endpoint.provider + endpoint.name;
    }, 50);
  };

  const [showEmbed, setShowEmbed] = React.useState(false);
  return React.createElement("div", {
    className: `${style['endpoint-item']} endpoint.name`
  }, React.createElement("div", {
    className: style['endpoint-info']
  }, React.createElement("a", {
    onClick: navigeteToEndpointInfo,
    href: link,
    className: `${style['endpoint-name']} to-white`
  }, endpoint.name), React.createElement("div", null, React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      setShowEmbed(!showEmbed);
    }
  }, showEmbed ? 'Hide embed' : 'Show embed'), showEmbed && React.createElement("div", {
    className: "endpoint-embed-wrapper"
  }, React.createElement(EndpointEmbededCode, {
    provider: endpoint.provider,
    endpoint: endpoint.name
  }))), React.createElement("div", {
    className: style['endpoint-dots']
  }, "Dots issued: ", endpoint.dotsIssued, endpoint.dotsBounded && React.createElement("div", null, "Dots bonded: ", endpoint.dotsBounded)), React.createElement("div", {
    className: `${style['endpoint-values']} to-white`
  }, equation)), !!endpoint.curve && React.createElement(CurveChart, {
    curves: endpoint.curve.values,
    dotsIssued: endpoint.dotsIssued
  }));
});