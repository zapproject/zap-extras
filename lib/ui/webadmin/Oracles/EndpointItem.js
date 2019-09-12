import * as React from 'react';
import { EndpointEmbededCode } from '../../shared/EndpointEmbededCode';
import { Curve } from '@zapjs/curve/lib/src';
import { parseHash } from '../../shared/pagination/utils';
import { CurveChart } from '../../shared/curve-chart/CurveChart';
const style = {
  "oracle-item": "zap-extras-oracles-oracle-item",
  "endpoint-item": "zap-extras-oracles-endpoint-item",
  "endpoint-name": "zap-extras-oracles-endpoint-name",
  "endpoint-dots": "zap-extras-oracles-endpoint-dots",
  "endpoint-values": "zap-extras-oracles-endpoint-values",
  "curve-chart": "zap-extras-oracles-curve-chart",
  "endpoint-info": "zap-extras-oracles-endpoint-info",
  "endpoints-count": "zap-extras-oracles-endpoints-count",
  "expanded": "zap-extras-oracles-expanded",
  "oracles-filter": "zap-extras-oracles-oracles-filter",
  "form-group": "zap-extras-oracles-form-group",
  "label": "zap-extras-oracles-label"
}; // @related-file ./oracles.css

export const EndpointItem = React.memo(props => {
  const {
    endpoint,
    baseUrl,
    onEndpointClick
  } = props;
  const hash = parseHash();
  const link = `${baseUrl};search=${hash.search};page=${hash.page};bonded=${hash.bonded ? 'true' : ''};oracle=` + endpoint.provider + endpoint.name;
  const equation = !!endpoint.curve ? Curve.curveToString(endpoint.curve.values) : '';

  const navigeteToEndpointInfo = () => {
    setTimeout(() => {
      onEndpointClick(endpoint); // location.href = '#' + (withBroker ? ViewsEnum.TOKEN_BONDAGE : ViewsEnum.GET_ENDPOINT) + ';' + endpoint.provider + endpoint.name;
    }, 50);
  };

  const [showEmbed, setShowEmbed] = React.useState(false);
  return React.createElement("div", {
    className: `${style['endpoint-item']}`
  }, React.createElement("div", {
    className: style['endpoint-info']
  }, React.createElement("a", {
    onClick: navigeteToEndpointInfo,
    href: link,
    className: `${style['endpoint-name']}`
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
    className: `${style['endpoint-values']}`
  }, equation)), !!endpoint.curve && React.createElement(CurveChart, {
    curves: endpoint.curve.values,
    dotsIssued: endpoint.dotsIssued
  }));
});