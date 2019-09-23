import * as React from 'react';
const style = require('./transaction-info.css');

export const TransactionInfo = ({txUrl}: {txUrl: string}) => {
	const isUrl = txUrl.indexOf('http') === 0;
  return <div className={style['transaction-info']}>
    Transaction info: {isUrl ? <a href={txUrl} target="_blank">{txUrl}</a> : txUrl}
  </div>
};
