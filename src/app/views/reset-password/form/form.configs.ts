import { TranslateService } from '@ngx-translate/core';
import { emailRFC821 } from '../../../validation/emailRFC821';

export function getFields(translator: TranslateService) {
    return [
        {
            key: 'email',
            type: 'input',
            className: 'auth-field',
            templateOptions: {
                type: 'email',
                label: 'Email',
                placeholder: 'Enter your email',
                required: true,
                minLength: 1,
                maxLength: 129,
                hideRequiredMarker: true,
            },
            validators: {
                validation: emailRFC821
            },
            validation: {
                messages: {
                    minlength: () => translator.instant('Validation.Common.EmailLength'),
                    maxlength: () => translator.instant('Validation.Common.EmailLength'),
                    email: () => translator.instant('Validation.Common.Email'),
                }
            },
        },
    ];
}

export function getModel() {
    return {
        email: '',
    };
}
