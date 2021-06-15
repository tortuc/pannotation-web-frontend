import { CheckoutPaymentModel } from './checkout.model';

import { CARD_NUMBER_PATTERN, ALPHANUMERIC_PUNCTUATION, NUMERIC, ALPHANUMERIC } from '../../app.constants';
import { Country } from '../../models/country/country';
import { getCurrentYearLastDigits } from '../../core/helpers/form-helper';

export function getPaymentConfig() {
    return [
        {
            key: 'firstName',
            type: 'input',
            className: 'auth-field',
            name: 'fname',
            templateOptions: {
                type: 'text',
                label: 'First Name',
                placeholder: 'Enter first name',
                maxLength: 30,
                attributes: {
                    autocomplete: 'given-name',
                },
                pattern: ALPHANUMERIC_PUNCTUATION,
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            },
            validation: {
                messages: {
                    required: () => 'First name field is empty',
                    maxlength: () => 'First name must be from 1 to 30 symbols',
                    pattern: () => 'First name can contain only alphanumeric and punctuation characters'
                }
            }
        },
        {
            key: 'lastName',
            type: 'input',
            name: 'lname',
            className: 'auth-field',
            templateOptions: {
                type: 'text',
                label: 'Last Name',
                attributes: {
                    autocomplete: 'family-name',
                },
                placeholder: 'Enter last name',
                maxLength: 30,
                pattern: ALPHANUMERIC_PUNCTUATION,
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            },
            validation: {
                messages: {
                    required: () => 'Last name field is empty',
                    maxlength: () => 'Last name must be from 1 to 30 symbols',
                    pattern: () => 'Last name can contain only alphanumeric and punctuation characters'
                }
            }
        },
        {
            key: 'cardNumber',
            type: 'input',
            name: 'cardnumber',
            className: 'auth-field',
            templateOptions: {
                type: 'number',
                attributes: {
                    autocomplete: 'cc-number',
                },
                label: 'Card number',
                placeholder: 'Enter card number',
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                value: (ctrl) => CARD_NUMBER_PATTERN.test(ctrl.value),
                minLength: (ctrl) => !!ctrl.value && !(ctrl.value.toString().length < 14),
                maxLength: (ctrl) => !!ctrl.value && !(ctrl.value.toString().length > 19)
            },
            validation: {
                messages: {
                    required: () => 'Card number field is empty',
                    maxLength: () => 'Card number doesn’t meet length validation criteria',
                    minLength: () => 'Card number doesn’t meet length validation criteria',
                    value: () => 'Card number does not exist',
                }
            }
        },
        {
            fieldGroupClassName: 'row',
            fieldGroup: [
                {
                    key: 'expirationMM',
                    type: 'dropdown',
                    name: 'ccmonth',
                    className: 'auth-field pr-2 expiration-date-input',
                    templateOptions: {
                        type: 'dropdown',
                        label: 'Expiration date',
                        attributes: {
                            autocomplete: 'cc-exp-month',
                        },
                        placeholder: 'MM',
                        required: true,
                        hideRequiredMarker: true,
                        options: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                        defaultValue: null
                    },
                    validators: {
                        required: () => 'Expiration date field is empty',
                    },
                },
                {
                    key: 'slash',
                    type: 'input',
                    className: 'auth-field mt-5',
                    templateOptions: {
                        type: 'slash',
                        label: '',
                        placeholder: '',
                        hideRequiredMarker: true,
                        defaultValue: null
                    },
                    template: `/`
                },
                {
                    key: 'expirationYY',
                    name: 'ccyear',
                    type: 'dropdown',
                    className: 'auth-field pl-2 mt-4 expiration-date-input',
                    templateOptions: {
                        type: 'dropdown',
                        label: '',
                        placeholder: 'YY',
                        required: true,
                        attributes: {
                          autocomplete: 'cc-exp-year'
                        },
                        hideRequiredMarker: true,
                        options: new Array<number>(11).fill(getCurrentYearLastDigits()).map((x, y) => {
                            const n = x + y;
                            return n < 10 ? ('0' + n.toString()) : n.toString();
                        }),
                        defaultValue: null
                    },
                    validators: {
                        required: () => 'Expiration date field is empty',
                    },
                },
                {
                    key: 'cvv',
                    type: 'input',
                    className: 'auth-field cvv-input',
                    templateOptions: {
                        type: 'password',
                        label: 'CVV',
                        placeholder: 'Enter CVV',
                        minLength: 3,
                        maxLength: 4,
                        pattern: NUMERIC,
                        required: true,
                        hideRequiredMarker: true,
                    },
                    validators: {
                        required: (ctrl) => ctrl.value && !!ctrl.value.trim().length,
                    },
                    validation: {
                        messages: {
                            required: () => 'CSC/CVV field is empty',
                            minlength: () => 'CSC/CVV doesn’t meet length validation criteria',
                            maxlength: () => 'CSC/CVV doesn’t meet length validation criteria',
                            pattern: () => 'CSC/CVV can contain only numeric characters'
                        }
                    }
                },
            ]
        }
    ];
}

export function getBillingConfig(countries: Country[]) {
    return [
        {
            key: 'address',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'address',
                label: 'Street address',
                placeholder: 'Enter street address',
                minLength: 1,
                maxLength: 50,
                pattern: ALPHANUMERIC_PUNCTUATION,
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            },
            validation: {
                messages: {
                    minlength: () => 'Street address must be from 1 to 50 symbols',
                    maxlength: () => 'Street address must be from 1 to 50 symbols',
                    pattern: () => 'Address can contain only alphanumeric and punctuation characters'
                }
            }
        },
        {
            key: 'country',
            type: 'dropdown',
            className: 'auth-field',
            templateOptions: {
                type: 'country',
                label: 'Country',
                placeholder: 'Country',
                required: true,
                hideRequiredMarker: true,
                options: countries.map(c => c.name),
                defaultValue: null
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            },
        },
        {
            key: 'city',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'city',
                label: 'City',
                placeholder: 'Enter city',
                minLength: 1,
                maxLength: 50,
                pattern: ALPHANUMERIC,
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            },
            validation: {
                messages: {
                    minlength: () => 'City must be from 1 to 50 symbols',
                    maxlength: () => 'City must be from 1 to 50 symbols',
                    pattern: () => 'City can contain only alphanumeric characters'
                }
            }
        },
        {
            fieldGroupClassName: 'row',
            fieldGroup: [
                {
                    key: 'state',
                    type: 'input',
                    className: 'auth-field col-md-9',
                    templateOptions: {
                        type: 'state',
                        label: 'State',
                        placeholder: 'Enter your state',
                        minLength: 2,
                        maxLength: 5,
                        pattern: ALPHANUMERIC,
                        hideRequiredMarker: true,
                    },
                    validation: {
                        messages: {
                            minlength: () => 'State must be from 2 to 5 symbols',
                            maxlength: () => 'State must be from 2 to 5 symbols',
                            pattern: () => 'State can contain only alphanumeric characters'
                        }
                    }
                },
                {
                    key: 'zip',
                    type: 'input',
                    className: 'auth-field col-md-3 pl-15 pl-md-0',
                    templateOptions: {
                        type: 'zip',
                        label: 'ZIP-code',
                        placeholder: 'ZIP-code',
                        minLength: 1,
                        maxLength: 10,
                        pattern: ALPHANUMERIC,
                        required: true,
                        hideRequiredMarker: true,
                    },
                    validators: {
                        required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
                    },
                    validation: {
                        messages: {
                            minlength: () => 'ZIP-code must be from 1 to 10 symbols',
                            maxlength: () => 'ZIP-code must be from 1 to 10 symbols',
                            pattern: () => 'Zip can contain only numeric characters'
                        }
                    }
                },
            ]
        }
    ];
}

export function getPaymentModel(): CheckoutPaymentModel {
    return {
        firstName: null,
        lastName: null,
        cardNumber: null,
        mmYY: null,
        cvv: null
    };
}

export function getBillingModel() {
    return {
        address: null,
        country: null,
        city: null,
        state: null,
        zip: null,
    };
}
