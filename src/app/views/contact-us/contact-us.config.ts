import { TranslateService } from '@ngx-translate/core';

import { invalidEmailMessage, requiredFieldMessage } from '../../validation';
import { EMAIL_PATTERN } from '../../app.constants';

export function getFields(translator: TranslateService) {
    return [
        {
            key: 'firstName',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'text',
                name: 'firstName',
                label: 'First Name',
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
            key: 'email',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'email',
                label: 'Email',
                maxLength: 129,
                placeholder: 'Enter your email',
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                email: (ctrl) => EMAIL_PATTERN.test(ctrl.value)
            },
            expressionProperties: {
                'templateOptions.label': () => translator.instant('SignIn.Form.EmailLabel'),
                'templateOptions.placeholder': () => translator.instant('SignIn.Form.EmailPlaceholder')
            },
            validation: {
                messages: {
                    required: requiredFieldMessage(translator),
                    email: invalidEmailMessage(translator)
                }
            }
        },
        {
            key: 'subject',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'text',
                name: 'subject',
                label: 'Subject',
                maxLength: 50,
                placeholder: 'Enter subject',
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            }
        },
        {
            key: 'message',
            type: 'textarea',
            className: 'auth-field',
            templateOptions: {
                name: 'message',
                label: 'Message',
                placeholder: 'Enter message',
                required: true,
                maxLength: 750,
                hideRequiredMarker: true,
                grow: false,
                rows: 6
            },
            validators: {
                required: (ctrl) => ctrl.value && !!ctrl.value.trim().length
            }
        },
    ];
}

export function getModel() {
    return {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    };
}
