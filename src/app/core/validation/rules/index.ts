import { FormlyFieldConfig } from '@ngx-formly/core';

export function minlengthValidationMessage(err: boolean, field: FormlyFieldConfig) {
    return `Should have at least ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err: boolean, field: FormlyFieldConfig) {
    return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err: boolean, field: FormlyFieldConfig) {
    return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err: boolean, field: FormlyFieldConfig) {
    return `This value should be less than ${field.templateOptions.max}`;
}
