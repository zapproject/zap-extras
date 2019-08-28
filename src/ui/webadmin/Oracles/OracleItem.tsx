import * as React from 'react';
import { OracleInfo } from './OracleInfo';
import { EndpointsList } from './EndpointsList';
import { parseHash } from '../../shared/pagination/utils';
import { ViewsEnum } from '../../shared/views.enum';
const style = require('./oracles.css');

export class OracleItem extends React.Component<{oracle: any; expandedAddress: string; withBroker: boolean}, {expanded: boolean}> {

  state = {expanded: false}
  ref = React.createRef<HTMLDivElement>();

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
      requestAnimationFrame(() => { this.setState({ expanded: true }, () => {
        if (!('scrollIntoView' in this.ref.current)) return;
        const endpoint = this.endpoint;
        const endpointElement = endpoint ? this.ref.current.getElementsByClassName(endpoint)[0] : null;
        const element = endpointElement || this.ref.current;
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        }, this.animate);
      })});
    } else {
      setTimeout(() => { this.setState({ expanded: false }) }, this.animate);
    }
  }

  render() {
    const expanded = this.expanded;
    const className = `${expanded ? style['oracle-item'] : ''} ${style['oracle-item']}`;
    const {oracle, withBroker} = this.props;
    const length = oracle.endpoints.length;
    const maxHeight = expanded ? (length * 200 + 200) + 'px' : 0;
    const endpointsText = (length === 1 ? 'Endpoint: ' : 'Endpoints: ') + length;
    const hash = parseHash();
    const link = `#${withBroker ? ViewsEnum.TOKEN_PROVIDERS_LIST : ViewsEnum.ORACLES};search=${hash.search};page=${hash.page};bonded=${hash.bonded ? 'true' : ''};oracle=` + (expanded ? '' : oracle.address);
    // const link = `#' + ViewsEnum.ORACLES + (expanded ? '' : ';' + oracle.address);
    return (
      <div ref={this.ref} className={className}>
        <OracleInfo address={oracle.address} title={oracle.title}></OracleInfo>
        {length > 0 && <a href={link} className={`${style["endpoints-count"]} to-white`}>{endpointsText}</a>}
        {length > 0 && <div style={{maxHeight, overflow: 'hidden', transition: `max-height ${this.animate}ms ease`}}>
          {this.state.expanded && <EndpointsList withBroker={withBroker} endpoints={oracle.endpoints}></EndpointsList>}
        </div>}
      </div>
    );
  }
}
