import { TranslateService } from '@ngx-translate/core';

import { NOT_SPACES_ONLY, PHONE_MAX_LENGTH, PHONE_MIN_LENGTH, PHONE_PATTERN } from '../../../app.constants';
import { UserModel } from '../../../models/user/user-model';
import { Country } from '../../../models/country/country';

export function getFields(translator: TranslateService, countries: Country[], defaultCountry: string) {
    return [
        {
            key: 'firstName',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'firstName',
                label: 'First name',
                placeholder: 'Enter your first name',
                minLength: 1,
                maxLength: 50,
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            },
            validation: {
                messages: {
                    minlength: () => translator.instant('Validation.Common.NameRequired'),
                    maxlength: () => translator.instant('Validation.Common.NameLength')
                }
            }
        },
        {
            key: 'lastName',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'lastName',
                label: 'Last name',
                placeholder: 'Enter your last name',
                minLength: 1,
                maxLength: 50,
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            },
            validation: {
                messages: {
                    minlength: () => translator.instant('Validation.Common.SurnameRequired'),
                    maxlength: () => translator.instant('Validation.Common.NameLength')
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
                required: true,
                hideRequiredMarker: true,
                options: countries.map(c => c.name),
                defaultValue: defaultCountry
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            },
        },
        {
            fieldGroupClassName: 'row',
            fieldGroup: [
                {
                    key: 'city',
                    type: 'input',
                    className: 'auth-field col-md-5 pr-15',
                    templateOptions: {
                        type: 'city',
                        label: 'City',
                        placeholder: 'Enter your city',
                        minLength: 1,
                        maxLength: 50,
                        pattern: NOT_SPACES_ONLY,
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
                            pattern: () => 'Invalid city'
                        }
                    }
                },
                {
                    key: 'state',
                    type: 'input',
                    className: 'auth-field col-md-4 pl-md-0',
                    templateOptions: {
                        type: 'state',
                        label: 'State',
                        placeholder: 'Enter your state',
                        maxLength: 50,
                        pattern: NOT_SPACES_ONLY,
                        hideRequiredMarker: true,
                    },
                    validation: {
                        messages: {
                            minlength: () => 'State must be from 1 to 50 symbols',
                            maxlength: () => 'State must be from 1 to 50 symbols',
                            pattern: () => 'Invalid state'
                        }
                    }
                },
                {
                    key: 'zip',
                    type: 'input',
                    className: 'auth-field col-md-3 pl-md-0',
                    templateOptions: {
                        type: 'zip',
                        label: 'ZIP-code',
                        placeholder: 'ZIP-code',
                        minLength: 1,
                        maxLength: 15,
                        pattern: NOT_SPACES_ONLY,
                        required: true,
                        hideRequiredMarker: true,
                    },
                    validators: {
                        required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
                    },
                    validation: {
                        messages: {
                            minlength: () => 'ZIP-code must be from 1 to 50 symbols',
                            maxlength: () => 'ZIP-code must be from 1 to 50 symbols',
                            pattern: () => 'Invalid ZIP-code'
                        }
                    }
                },
            ]
        },
        {
            key: 'address',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'address',
                label: 'Street address',
                placeholder: 'Enter your street address',
                minLength: 1,
                maxLength: 50,
                pattern: NOT_SPACES_ONLY,
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
                    pattern: () => 'Invalid address'
                }
            }
        },
        {
            fieldGroupClassName: 'row',
            fieldGroup: [
                {
                    key: 'phoneNumber',
                    type: 'input',
                    className: 'auth-field col-md-6 pr-md-2',
                    templateOptions: {
                        type: 'tel',
                        label: 'Phone number',
                        placeholder: '+11231231234',
                        minLength: PHONE_MIN_LENGTH,
                        maxLength: PHONE_MAX_LENGTH,
                        pattern: PHONE_PATTERN,
                        required: true,
                        hideRequiredMarker: true,
                        keypress: function(field, event) {
                            if ((event.charCode < 48 || event.charCode > 57) && event.charCode !== 43) {
                                event.preventDefault();
                            }
                        }
                    },
                    validators: {
                        required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
                    },
                    validation: {
                        messages: {
                            minlength: () => 'Invalid phone number',
                            maxlength: () => 'Invalid phone number',
                            pattern: () => 'Invalid phone number'
                        }
                    }
                },
                {
                    key: 'mobileNumber',
                    type: 'input',
                    className: 'auth-field col-md-6 pl-md-2',
                    templateOptions: {
                        type: 'tel',
                        label: 'Mobile number',
                        placeholder: '+11231231234',
                        minLength: PHONE_MIN_LENGTH,
                        maxLength: PHONE_MAX_LENGTH,
                        pattern: PHONE_PATTERN,
                        hideRequiredMarker: true,
                        keypress: function(field, event) {
                            if ((event.charCode < 48 || event.charCode > 57) && event.charCode !== 43) {
                                event.preventDefault();
                            }
                        }
                    },
                    validation: {
                        messages: {
                            minlength: () => 'Invalid mobile number',
                            maxlength: () => 'Invalid mobile number',
                            pattern: () => 'Invalid mobile number'
                        }
                    }
                },
            ]
        },
        {
            key: 'isComposer',
            type: 'checkbox',
            className: 'auth-field auth-checkbox d-inline-block',
            defaultValue: false,
            templateOptions: {
                type: 'isComposer',
                hideRequiredMarker: true,
                label: 'Contributor',
                indeterminate: false
            }
        },
        {
            key: 'question',
            type: 'input',
            className: 'question-label',
            templateOptions: {
                type: 'question',
                label: '',
                hideRequiredMarker: true,
                tooltip: 'Test this out You can write HTML in here'
            },
            template: `<img src="/assets/img/question.png" /><div class="question-tooltip">Contributor - Add your music scores,
                        dissertations and other material for sale on the site</div>`
        },
        {
            key: 'idCode',
            type: 'input',
            className: 'auth-field',
            defaultValue: null,
            templateOptions: {
                type: 'idCode',
                label: 'Drivers license',
                placeholder: 'Enter drivers license',
                minLength: 1,
                maxLength: 50,
                required: true,
                hideRequiredMarker: true,
            },
            hideExpression: 'model.isComposer != true',
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            },
            validation: {
                messages: {
                    minlength: () => 'Invalid mobile number',
                    maxlength: () => 'Invalid mobile number',
                    pattern: () => 'Invalid mobile number'
                }
            }
        }
    ];
}

export function getModel(profile: UserModel) {
    return {
        firstName: profile ? profile.firstName : '',
        lastName: profile ? profile.lastName : '',
        phoneNumber: profile ? profile.phoneNumber : '',
        mobileNumber: profile && profile.mobileNumber ? profile.mobileNumber : undefined,
        idCode: profile && profile.idCode ? profile.idCode : undefined,
        country: profile ? profile.country : '',
        state: profile ? profile.state : '',
        city: profile ? profile.city : '',
        zip: profile ? profile.zip : '',
        isComposer: profile ? profile.isComposer : undefined,
        imageId: profile && profile.avatar ? profile.avatar.id : null,
        address: profile ? profile.address : ''
    };
}
