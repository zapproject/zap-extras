export const formatPrice = value => {
  if (value >= 1e16) return Math.round(value / 1e15) / 1e3 + ' ZAP';
  if (value >= 1e6) return Math.round(value / 1e6) / 1e3 + ' gwei ZAP';
  return value + ' wei ZAP';
};