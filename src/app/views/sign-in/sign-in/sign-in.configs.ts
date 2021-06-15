import { TranslateService } from '@ngx-translate/core';

import { invalidEmailMessage, requiredFieldMessage } from '../../../validation';
import { EMAIL_PATTERN, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_PATTERN } from '../../../app.constants';
import { emailRFC821 } from '../../../validation/emailRFC821';

export function getFields(translator: TranslateService) {
    return [
        {
            key: 'email',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'email',
                pattern: EMAIL_PATTERN,
                required: true,
                hideRequiredMarker: true,
            },
            validators: {
                validation: emailRFC821,
            },
            expressionProperties: {
                'templateOptions.label': () => translator.instant('SignIn.Form.EmailLabel'),
                'templateOptions.placeholder': () => translator.instant('SignIn.Form.EmailPlaceholder')
            },
            validation: {
                messages: {
                    required: requiredFieldMessage(translator),
                    email: invalidEmailMessage(translator),
                    pattern: invalidEmailMessage(translator)
                }
            }
        },
        {
            key: 'password',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'password',
                placeholder: 'Enter your password',
                required: true,
                hideRequiredMarker: true,
                minLength: PASSWORD_MIN_LENGTH,
                maxLength: PASSWORD_MAX_LENGTH,
                pattern: PASSWORD_PATTERN
            },
            expressionProperties: {
                'templateOptions.label': () => translator.instant('SignIn.Form.PasswordLabel')
            },
            validation: {
                messages: {
                    pattern: () => translator.instant('Validation.Common.Password'),
                    minlength: () => translator.instant('Validation.Common.PassLength'),
                    maxlength: () => translator.instant('Validation.Common.PassLength'),
                }
            }
        },
    ];
}

export function getModel() {
    return {
        email: '',
        password: ''
    };
}
