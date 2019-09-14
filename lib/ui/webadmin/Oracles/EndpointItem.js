import * as React from 'react';
import { EndpointEmbededCode } from '../../shared/EndpointEmbededCode';
import { Curve } from '@zapjs/curve/lib/src';
import { parseHash } from '../../shared/pagination/utils';
import { CurveChart } from '../../shared/curve-chart/CurveChart';
import { EmbedIcon } from './EmbedIcon';
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
  "label": "zap-extras-oracles-label",
  "endpoint-embed-wrapper": "zap-extras-oracles-endpoint-embed-wrapper",
  "endpoint-embed-button": "zap-extras-oracles-endpoint-embed-button"
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
  }, endpoint.name), React.createElement("a", {
    type: "button",
    className: style['endpoint-embed-button'],
    title: showEmbed ? 'Hide embed' : 'Show embed',
    onClick: e => {
      e.preventDefault();
      setShowEmbed(!showEmbed);
    }
  }, React.createElement(EmbedIcon, {
    style: {
      fill: showEmbed ? '#0056b3' : '#fff'
    }
  })), showEmbed && React.createElement("div", {
    className: style['endpoint-embed-wrapper']
  }, React.createElement(EndpointEmbededCode, {
    provider: endpoint.provider,
    endpoint: endpoint.name
  })), React.createElement("div", {
    className: style['endpoint-dots']
  }, "Dots issued: ", endpoint.dotsIssued, endpoint.dotsBounded && React.createElement("div", null, "Dots bonded: ", endpoint.dotsBounded)), React.createElement("div", {
    className: `${style['endpoint-values']}`
  }, equation)), !!endpoint.curve && React.createElement(CurveChart, {
    curves: endpoint.curve.values,
    dotsIssued: endpoint.dotsIssued
  }));
});