import { FormGroup } from '@angular/forms';

export function resetForm(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
        const control = form.get(key);
        control.reset();
        control.markAsPristine();
        control.markAsUntouched();
        control.markAsPending();

        if (control instanceof FormGroup) {
            resetForm(control);
        }
    });
}

export function getCurrentYearLastDigits(): number {
    const fullYear = new Date().getFullYear().toString();
    const lastDigits = fullYear.slice(fullYear.length - 2);
    return parseInt(lastDigits, 10);
}
