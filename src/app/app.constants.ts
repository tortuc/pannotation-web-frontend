// VALIDATIONS
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 50;
export const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[A-Z])([a-zA-Z0-9\s\S_-]+)/;
export const PHONE_MIN_LENGTH = 6;
export const SEARCH_QUERY_LENGTH = 3;
export const PHONE_MAX_LENGTH = 16;
export const PHONE_PATTERN = /^\+[0-9]\d{5,15}$/;
export const NOT_SPACES_ONLY = /^(?!\s+$).+/;
export const ALPHANUMERIC_PUNCTUATION = /^[a-zA-Z0-9 .-]*$/;
export const NUMERIC = /^[0-9]*$/;
export const ALPHANUMERIC = /^[a-zA-Z0-9 ]*$/;

// tslint:disable-next-line:max-line-length
export const CARD_NUMBER_PATTERN = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
export const CARD_EXPIRATION_PATTERN = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
// tslint:disable-next-line:max-line-length
export const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ZIP_CODE_PATTERN = /^[0-9]{5}(?:-[0-9]{4})?$/;

// PAGINATION
export const DEFAULT_LIMIT = 12;
export const DEFAULT_FILTERS = {
    limit: DEFAULT_LIMIT,
    offset: 0
};
