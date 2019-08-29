import * as React from 'react';
import { CurveChart } from '../../shared/CurveChart';
import { EndpointEmbededCode } from '../../shared/EndpointEmbededCode';
import { Curve } from '@zapjs/curve/lib/src';
import { parseHash } from '../../shared/pagination/utils';
const style = require('./oracles.css');

interface Props {
  endpoint: any;
  baseUrl: string;
  onEndpointClick: (endpoinst: any) => void;
}

export const EndpointItem = React.memo((props: Props) => {
  const { endpoint, baseUrl, onEndpointClick } = props;
  const hash = parseHash();
  const link = `${baseUrl};search=${hash.search};page=${hash.page};bonded=${hash.bonded ? 'true' : ''};oracle=`
    + endpoint.provider + endpoint.name;
  const equation = !!endpoint.curve ? Curve.curveToString(endpoint.curve.values) : '';
  const navigeteToEndpointInfo = () => {setTimeout(() => {
    onEndpointClick(endpoint);
    // location.href = '#' + (withBroker ? ViewsEnum.TOKEN_BONDAGE : ViewsEnum.GET_ENDPOINT) + ';' + endpoint.provider + endpoint.name;
  }, 50)};

  const [showEmbed, setShowEmbed] = React.useState(false);

  return (
    <div className={`${style['endpoint-item']} endpoint.name`}>
      <div className={style['endpoint-info']}>
        <a onClick={navigeteToEndpointInfo} href={link} className={`${style['endpoint-name']} to-white`}>{endpoint.name}</a>
        <div>
          <a href="#" onClick={e => {e.preventDefault(); setShowEmbed(!showEmbed)}}>{showEmbed ? 'Hide embed' : 'Show embed'}</a>
          {showEmbed && <div className="endpoint-embed-wrapper">
            <EndpointEmbededCode provider={endpoint.provider} endpoint={endpoint.name}></EndpointEmbededCode>
          </div>}
        </div>
        <div className={style['endpoint-dots']}>
          Dots issued: {endpoint.dotsIssued}
          {endpoint.dotsBounded && <div>Dots bonded: {endpoint.dotsBounded}</div>}
        </div>
        <div className={`${style['endpoint-values']} to-white`}>{equation}</div>
      </div>

      {!!endpoint.curve && <CurveChart curves={endpoint.curve.values} dotsIssued={endpoint.dotsIssued}></CurveChart>}
    </div>
  );
});
