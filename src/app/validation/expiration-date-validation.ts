import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const expirationDateValidation = (): ValidatorFn => (control: AbstractControl) => {
    if (parseInt(control.get('year').value, 10) > moment().year()) {
        return null;
    }
    if (parseInt(control.get('year').value, 10) === moment().year() && parseInt(control.get('month').value, 10) > moment().month()) {
        return null;
    }
    return { expirationDateValidation: { valid: false } };
};
