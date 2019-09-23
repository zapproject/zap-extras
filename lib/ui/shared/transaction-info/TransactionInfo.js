import * as React from 'react';
const style = {
  "transaction-info": "zap-extras-transaction-info-transaction-info"
}; // @related-file ./transaction-info.css

export const TransactionInfo = ({
  txUrl
}) => {
  const isUrl = txUrl.indexOf('http') === 0;
  return React.createElement("div", {
    className: style['transaction-info']
  }, "Transaction info: ", isUrl ? React.createElement("a", {
    href: txUrl,
    target: "_blank"
  }, txUrl) : txUrl);
};