import * as React from 'react';
import { EndpointEmbededCode } from '../../shared/EndpointEmbededCode';
import { Curve } from '@zapjs/curve/lib/src';
import { parseHash } from '../../shared/pagination/utils';
import { CurveChart } from '../../shared/curve-chart/CurveChart';
const style = {
  "oracle-item": "Oracles_oracles__oracle-item",
  "endpoint-item": "Oracles_oracles__endpoint-item",
  "endpoint-name": "Oracles_oracles__endpoint-name",
  "endpoint-dots": "Oracles_oracles__endpoint-dots",
  "endpoint-values": "Oracles_oracles__endpoint-values",
  "curve-chart": "Oracles_oracles__curve-chart",
  "endpoint-info": "Oracles_oracles__endpoint-info",
  "endpoints-count": "Oracles_oracles__endpoints-count",
  "expanded": "Oracles_oracles__expanded",
  "oracles-filter": "Oracles_oracles__oracles-filter",
  "form-group": "Oracles_oracles__form-group",
  "label": "Oracles_oracles__label"
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