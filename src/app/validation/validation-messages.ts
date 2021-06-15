import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

type ValidationMessageFn = (error: any, field: FormlyFieldConfig) => string;

export function requiredFieldMessage(translator: TranslateService): ValidationMessageFn {
    return function (): string {
        return translator.instant('Validation.Common.Required');
    };
}

export function invalidEmailMessage(translator: TranslateService): ValidationMessageFn {
    return function (): string {
        return translator.instant('Validation.Common.Email');
    };
}

export function invalidValueMessage(translator: TranslateService): ValidationMessageFn {
    return function (): string {
        return translator.instant('Validation.Common.InvalidValue');
    };
}

export function minlengthMessage(translator: TranslateService, value: number): ValidationMessageFn {
    return function (): string {
        return translator.instant('Validation.Common.MinLength', {value});
    };
}

export function maxlengthMessage(translator: TranslateService, value: number): ValidationMessageFn {
    return function (): string {
        return translator.instant('Validation.Common.MaxLength', {value});
    };
}

export function lengthBetweenMessage(translator: TranslateService, value: { min: number, max: number }): ValidationMessageFn {
    return function(): string {
        return translator.instant('Validation.Common.LengthBetween', value);
    };
}

export function minMessage(translator: TranslateService, value: number): ValidationMessageFn {
    return function (): string {
        return translator.instant('Validation.Common.Min', {value});
    };
}

export function maxMessage(translator: TranslateService, value: number): ValidationMessageFn {
    return function (): string {
        return translator.instant('Validation.Common.Max', {value});
    };
}
