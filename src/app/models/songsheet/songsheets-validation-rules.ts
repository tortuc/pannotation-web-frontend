export const rules = {
    minTitleLength: 1,
    maxTitleLength: 50,
    minDescriptionLength: 1,
    maxDescriptionLength: 1000,
    minPrice: 0.01,
    maxPrice: 9999999999.99,
    notOnlySpacesRegExp: /^(\s*)((\s*\S)|(\S\s*)+)(\s*)*$/,
    priceRegExp: /^([1-9][0-9]{0,9}|0)(\.[0-9]{1,2})?$/
};
