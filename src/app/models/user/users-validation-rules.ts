export const rules = {
    notSpacesOnly: /\S+/,
    minAmount: 0.01,
    maxAmount: 9999999999.99,
    amountRegExp: /^([1-9][0-9]{0,9}|0)(\.[0-9]{1,2})?$/
};
