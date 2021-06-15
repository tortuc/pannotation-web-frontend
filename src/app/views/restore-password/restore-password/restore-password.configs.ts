import { TranslateService } from '@ngx-translate/core';

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_PATTERN } from '../../../app.constants';

export function getFields(translator: TranslateService) {
    return [
        {
            key: 'password',
            validators: {
                fieldMatch: {
                    expression: (control) => {
                        const value = control.value;

                        return value.confirmPassword === value.password
                            // avoid displaying the message error when values are empty
                            || !value.password;
                    },
                    message: () => translator.instant('Validation.Common.PasswordsDontMatch'),
                    errorPath: 'confirmPassword',
                },
            },
            fieldGroup: [
                {
                    key: 'password',
                    type: 'input',
                    className: 'auth-field',
                    templateOptions: {
                        type: 'password',
                        label: 'New Password',
                        placeholder: 'Enter new password',
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
                    key: 'confirmPassword',
                    type: 'input',
                    className: 'auth-field',
                    templateOptions: {
                        type: 'password',
                        label: 'Confirm new password',
                        placeholder: 'Confirm new password',
                        required: true,
                        hideRequiredMarker: true
                    },
                },
            ],
        },
    ];
}

export function getModel() {
    return {
        password: {
            password: '',
            confirmPassword: ''
        },
    };
}
