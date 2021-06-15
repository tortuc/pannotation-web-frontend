import { TranslateService } from '@ngx-translate/core';
import { Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_PATTERN } from '../../../app.constants';
import { emailRFC821 } from '../../../validation/emailRFC821';

export function getFields(translator: TranslateService, domSanitizer?: DomSanitizer) {
    return [
        {
            key: 'name',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'name',
                label: 'First name',
                placeholder: 'Enter your first name',
                minLength: 1,
                maxLength: 50,
                required: true,
                hideRequiredMarker: true,
            },
            validation: {
                messages: {
                    minlength: () => translator.instant('Validation.Common.NameRequired'),
                    maxlength: () => translator.instant('Validation.Common.NameLength')
                }
            }
        },
        {
            key: 'surname',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'surname',
                label: 'Last name',
                placeholder: 'Enter your last name',
                minLength: 1,
                maxLength: 50,
                required: true,
                hideRequiredMarker: true,
            },
            validation: {
                messages: {
                    minlength: () => translator.instant('Validation.Common.SurnameRequired'),
                    maxlength: () => translator.instant('Validation.Common.NameLength')
                }
            }
        },
        {
            key: 'email',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'email',
                label: 'Email address',
                placeholder: 'Enter email',
                minLength: 1,
                maxLength: 129,
                required: true,
                hideRequiredMarker: true,
            },
            validation: {
                messages: {
                    minlength: () => translator.instant('Validation.Common.EmailLength'),
                    maxlength: () => translator.instant('Validation.Common.EmailLength'),
                    email: () => translator.instant('Validation.Common.Email'),
                }
            },
            validators: {
                validation: emailRFC821
            },
        },
        {
            key: 'password',
            validators: {
                fieldMatch: {
                    expression: (control) => {
                        const value = control.value;

                        return value.passwordConfirm === value.password
                            // avoid displaying the message error when values are empty
                            || !value.password;
                    },
                    message: () => translator.instant('Validation.Common.PasswordsDontMatch'),
                    errorPath: 'passwordConfirm',
                },
            },
            fieldGroup: [
                {
                    key: 'password',
                    type: 'input',
                    className: 'auth-field',
                    templateOptions: {
                        type: 'password',
                        name: 'password',
                        label: 'Password',
                        placeholder: 'Password',
                        required: true,
                        hideRequiredMarker: true,
                        minLength: PASSWORD_MIN_LENGTH,
                        maxLength: PASSWORD_MAX_LENGTH,
                        pattern: PASSWORD_PATTERN
                    },
                    validation: {
                        messages: {
                            pattern: () => translator.instant('Validation.Common.Password'),
                            minlength: () => translator.instant('Validation.Common.PassLength'),
                            maxlength: () => translator.instant('Validation.Common.PassLength'),
                        }
                    }
                },
                {
                    key: 'passwordConfirm',
                    type: 'input',
                    className: 'auth-field confirm-password-input',
                    templateOptions: {
                        name: 'repeat-password',
                        type: 'password',
                        label: 'Confirm Password',
                        placeholder: 'Please re-enter your password'
                    },
                },
            ],
        },
        {
            key: 'acceptance',
            type: 'checkbox',
            className: 'auth-field auth-checkbox d-inline-block',
            templateOptions: {
                hideRequiredMarker: true,
                label: '',
                required: true,
                indeterminate: false,
            },
            validation: {
                messages: {
                    required: () => '',
                }
            },
            validators: {
                validation: [Validators.requiredTrue]
            },
        },
        {
            key: 'checkbox-label',
            type: 'input',
            className: 'auth-checkbox-label d-inline-block',
            templateOptions: {
                label: '',
            },
            template:
                `<span>${domSanitizer.sanitize(
                    SecurityContext.HTML,
                    'Read and accept <a href="/terms-and-conditions">Terms & Conditions</a> ' +
                    'and <a href="/privacy-policy">Privacy Policy</a>')}</span>`
        },
    ];
}

export function getModel() {
    return {
        name: '',
        surname: '',
        email: '',
        password: {
            password: '',
            passwordConfirm: ''
        }
    };
}
