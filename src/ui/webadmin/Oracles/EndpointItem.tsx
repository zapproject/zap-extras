import * as React from 'react';
import { CurveChart } from '../../shared/CurveChart';
import { EndpointEmbededCode } from '../../shared/EndpointEmbededCode';
import { Curve } from '@zapjs/curve/lib/src';
import { parseHash } from '../../shared/pagination/utils';
import { ViewsEnum } from '../../shared/views.enum';
const style = require('./oracles.css');

export const EndpointItem = React.memo((props: {endpoint: any; withBroker: boolean}) => {
  const { endpoint, withBroker } = props;
  const hash = parseHash();
  const link = `#${withBroker ? ViewsEnum.TOKEN_PROVIDERS_LIST : ViewsEnum.ORACLES};search=${hash.search};page=${hash.page};bonded=${hash.bonded ? 'true' : ''};oracle=`
    + endpoint.provider + endpoint.name;
  const equation = !!endpoint.curve ? Curve.curveToString(endpoint.curve.values) : '';
  const navigeteToEndpointInfo = () => {setTimeout(() => {
    location.href = '#' + (withBroker ? ViewsEnum.TOKEN_BONDAGE : ViewsEnum.GET_ENDPOINT) + ';' + endpoint.provider + endpoint.name;
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
