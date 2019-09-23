import * as React from 'react';
import { Message } from '../message/Message';
import { Loading } from '../loading/Loading';
import { TransactionInfo } from '../transaction-info/TransactionInfo';
const style = {
  "root": "zap-extras-bond-form-root",
  "bond-approve-wrapper": "zap-extras-bond-form-bond-approve-wrapper",
  "approve-wrapper": "zap-extras-bond-form-approve-wrapper",
  "approve-suggest": "zap-extras-bond-form-approve-suggest",
  "bond-approve-wrapper--suggest": "zap-extras-bond-form-bond-approve-wrapper--suggest"
}; // @related-file ./bond-form.css

export const BondForm = ({
  provider,
  endpoint,
  zap,
  approvedZap,
  boundDots,
  requiredZap,
  onBond,
  onDelegate,
  onDotsChange,
  loading,
  error,
  message,
  children,
  approve,
  showApprove,
  formatPrice,
  txUrl
}) => {
  const [dots, setDots] = React.useState(1);
  const [delegate, setDelegate] = React.useState('');
  const handleDotsChange = React.useCallback(e => {
    const dots = Number(e.target.value);
    setDots(dots);
    onDotsChange(dots);
  }, []);
  const handleDelegateChange = React.useCallback(e => {
    setDelegate(e.target.value.trim());
  }, []);
  const handleBondClick = React.useCallback(() => {
    if (!!delegate) {
      onDelegate(dots, delegate);
    } else {
      onBond(dots);
    }
  }, []); // const needApprove = React.useMemo(() => approvedZap.lt(requiredZap), [approvedZap, requiredZap]);

  const balanceInsufficent = zap.lt(requiredZap);
  return React.createElement("div", {
    className: style.root
  }, React.createElement("div", {
    className: "bond-provider"
  }, provider.title, " - ", provider.address), React.createElement("div", {
    className: "bond-endpoint"
  }, endpoint), !!error && React.createElement(Message, {
    type: "error"
  }, error), !!loading && React.createElement(Loading, null, loading), !!message && React.createElement(Message, {
    type: "success"
  }, message), !!txUrl && React.createElement("div", null, React.createElement(Message, {
    type: "success"
  }, "Bonded to endpoint"), "}", React.createElement(TransactionInfo, {
    txUrl: txUrl
  })), approvedZap != null && React.createElement("p", null, "You have approved ", formatPrice(approvedZap.toNumber())), React.createElement("fieldset", {
    disabled: !!loading
  }, React.createElement("div", {
    className: "form-group"
  }, React.createElement("label", {
    htmlFor: "dots"
  }, "You have ", boundDots, " DOTs bound. How many would you like to bond?"), React.createElement("input", {
    type: "number",
    value: dots,
    onChange: handleDotsChange
  }))), requiredZap !== null && React.createElement("div", null, React.createElement("p", null, "This will require ", formatPrice(requiredZap.toNumber())), balanceInsufficent && React.createElement(Message, {
    type: "error"
  }, "Balance insufficent.")), React.createElement("div", {
    className: `${style['bond-approve-wrapper']} ${style['bond-approve-wrapper--' + approve]}`
  }, approve === 'show' && React.createElement("div", {
    className: style['approve-wrapper']
  }, children), approve === 'suggest' && React.createElement("div", {
    className: style['approve-suggest']
  }, React.createElement("button", {
    type: "button",
    onClick: showApprove
  }, "Approve")), React.createElement("fieldset", {
    disabled: !!approve || !!loading || balanceInsufficent
  }, !!onDelegate && React.createElement("div", {
    className: "form-group"
  }, React.createElement("label", null, "Delegate to (optional)"), React.createElement("input", {
    type: "text",
    value: delegate,
    onChange: handleDelegateChange,
    placeholder: "Subscriber Address"
  })), React.createElement("div", {
    className: "form-group"
  }, React.createElement("button", {
    type: "button",
    onClick: handleBondClick
  }, !!delegate ? 'Delegate bond' : 'Bond')))));
};