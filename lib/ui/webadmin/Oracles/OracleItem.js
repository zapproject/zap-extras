function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { OracleInfo } from './OracleInfo';
import { EndpointsList } from './EndpointsList';
import { parseHash } from '../../shared/pagination/utils';
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

export class OracleItem extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      expanded: false
    });

    _defineProperty(this, "ref", React.createRef());
  }

  get animate() {
    if (this.props.oracle.endpoints.length < 3) return 100;
    return Math.log(this.props.oracle.endpoints.length) * 200;
  }

  get expanded() {
    return this.props.expandedAddress.indexOf(this.props.oracle.address) === 0;
  }

  get endpoint() {
    if (!this.expanded) return '';
    return this.props.expandedAddress.slice(42);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.oracle !== nextProps.oracle) return true;
    if (this.state.expanded !== nextState.expanded) return true;
    const expanded = this.expanded;
    if (expanded && nextProps.expandedAddress !== this.props.expandedAddress) return true;
    if (!expanded && nextProps.expandedAddress.indexOf(nextProps.oracle.address) === -0) return true;
    return false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expandedAddress === this.props.expandedAddress) return;

    if (this.expanded) {
      requestAnimationFrame(() => {
        this.setState({
          expanded: true
        }, () => {
          if (!('scrollIntoView' in this.ref.current)) return;
          const endpoint = this.endpoint;
          const endpointElement = endpoint ? this.ref.current.getElementsByClassName(endpoint)[0] : null;
          const element = endpointElement || this.ref.current;
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'start'
            });
          }, this.animate);
        });
      });
    } else {
      setTimeout(() => {
        this.setState({
          expanded: false
        });
      }, this.animate);
    }
  }

  render() {
    const expanded = this.expanded;
    const className = `${expanded ? style['oracle-item'] : ''} ${style['oracle-item']}`;
    const {
      oracle,
      baseUrl,
      onEndpointClick
    } = this.props;
    const length = oracle.endpoints.length;
    const maxHeight = expanded ? length * 200 + 200 + 'px' : 0;
    const endpointsText = (length === 1 ? 'Endpoint: ' : 'Endpoints: ') + length;
    const hash = parseHash();
    const link = `${baseUrl};search=${hash.search};page=${hash.page};bonded=${hash.bonded ? 'true' : ''};oracle=` + (expanded ? '' : oracle.address);
    return React.createElement("div", {
      ref: this.ref,
      className: className
    }, React.createElement(OracleInfo, {
      address: oracle.address,
      title: oracle.title
    }), length > 0 && React.createElement("a", {
      href: link,
      className: `${style["endpoints-count"]} to-white`
    }, endpointsText), length > 0 && React.createElement("div", {
      style: {
        maxHeight,
        overflow: 'hidden',
        transition: `max-height ${this.animate}ms ease`
      }
    }, this.state.expanded && React.createElement(EndpointsList, {
      baseUrl: baseUrl,
      onEndpointClick: onEndpointClick,
      endpoints: oracle.endpoints
    })));
  }

}