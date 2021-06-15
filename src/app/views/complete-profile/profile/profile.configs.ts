import { TranslateService } from '@ngx-translate/core';
import { PHONE_MIN_LENGTH, PHONE_MAX_LENGTH, PHONE_PATTERN, NOT_SPACES_ONLY } from 'src/app/app.constants';
import { UserModel } from '../../../models/user/user-model';
import { Country } from '../../../models/country/country';

export function getFieldsStep1(translator: TranslateService, userData: UserModel) {
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
                pattern: NOT_SPACES_ONLY,
                required: true,
                hideRequiredMarker: true,
            },
            validation: {
                messages: {
                    minlength: () => translator.instant('Validation.Common.NameRequired'),
                    maxlength: () => translator.instant('Validation.Common.NameLength'),
                    pattern: () => 'First name is required'
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
                pattern: NOT_SPACES_ONLY,
                required: true,
                hideRequiredMarker: true,
            },
            validation: {
                messages: {
                    minlength: () => translator.instant('Validation.Common.SurnameRequired'),
                    maxlength: () => translator.instant('Validation.Common.NameLength'),
                    pattern: () => 'Last name is required'
                }
            }
        },
        {
            key: 'phoneNumber',
            type: 'input',
            className: 'auth-field',
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
            className: 'auth-field',
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
        {
            key: 'isComposer',
            type: 'checkbox',
            className: 'auth-field auth-checkbox d-inline-block',
            defaultValue: false,
            templateOptions: {
                type: 'isComposer',
                hideRequiredMarker: true,
                label: 'Contributor',
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
                label: 'Driver license / ID',
                placeholder: 'Enter your driver license',
                pattern: NOT_SPACES_ONLY,
                minLength: 1,
                maxLength: 50,
                required: true,
                hideRequiredMarker: true,
            },
            hideExpression: 'model.isComposer != true',
            validation: {
                messages: {
                    minlength: () => 'Invalid driver license/ID',
                    maxlength: () => 'Invalid driver license/ID',
                    pattern: () => 'Driver license/ID is required'
                }
            }
        }
    ];
}

export function getFieldsStep2(countries: Country[]) {
    return [
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
            validation: {
                messages: {
                    minlength: () => 'Street address must be from 1 to 50 symbols',
                    maxlength: () => 'Street address must be from 1 to 50 symbols',
                    pattern: () => 'Invalid address'
                }
            }
        },
        {
            key: 'country',
            type: 'dropdown',
            className: 'auth-field countries-dropdown',
            templateOptions: {
                type: 'country',
                label: 'Country',
                required: true,
                hideRequiredMarker: true,
                options: countries.map(c => c.name),
                defaultValue: 'Country'
            },
        },
        {
            key: 'city',
            type: 'input',
            className: 'auth-field',
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
            className: 'auth-field complete-profile-state d-inline-block col-md-7 pl-0 mb-4',
            templateOptions: {
                type: 'state',
                label: 'State',
                placeholder: 'Enter your state',
                minLength: 1,
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
            className: 'auth-field complete-profile-zip d-inline-block col-md-5 pr-0 mb-4 align-top',
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
            validation: {
                messages: {
                    minlength: () => 'ZIP-code must be from 1 to 50 symbols',
                    maxlength: () => 'ZIP-code must be from 1 to 50 symbols',
                    pattern: () => 'Invalid ZIP-code'
                }
            }
        },
    ];
}
