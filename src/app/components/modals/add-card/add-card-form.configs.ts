import { Validators } from '@angular/forms';
import * as moment from 'moment';

const cardNumberLengthMin = 14;
const cardNumberLengthMax = 16;

export const cardFormControls: any = {
    number: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(cardNumberLengthMin),
        Validators.maxLength(cardNumberLengthMax)
    ]],
    month: ['', [
        Validators.required,
        Validators.pattern(/^\d{1,2}$/),
        Validators.min(1),
        Validators.max(12)
    ]],
    year: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(moment().year()),
        Validators.max(2099)
    ]],
    cvv: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{3}$/)
    ]]
};

export const cardFormErrors = (translate) => ({
    number: {
        required: translate.instant('Validation.Common.Required'),
        pattern: translate.instant('Validation.Common.OnlyDigits'),
        minlength: translate.instant('Validation.Common.MinLength', { value: cardNumberLengthMin }),
        maxlength: translate.instant('Validation.Common.MaxLength', { value: cardNumberLengthMax })
    },
    month: {
        required: translate.instant('Validation.Common.Required'),
        pattern: translate.instant('Validation.Common.MustBeNumber'),
        min: translate.instant('Validation.Common.Min', { value: 1 }),
        max: translate.instant('Validation.Common.Max', { value: 12 })
    },
    year: {
        required: translate.instant('Validation.Common.Required'),
        pattern: translate.instant('Validation.Common.MustBeNumber'),
        min: translate.instant('Validation.Common.Min', { value: moment().year() }),
        max: translate.instant('Validation.Common.Max', { value: 2099 })
    },
    cvv: {
        required: translate.instant('Validation.Common.Required'),
        pattern: translate.instant('Validation.Common.MustBeNumberAndMinLength', { value: 3 })
    }
});
