import { AbstractControl, ValidationErrors } from '@angular/forms';

export const emailRFC821 = (control: AbstractControl): ValidationErrors => {
    const partsSeparator = '@';
    let emailInvalid = false;
    if (control.value) {
        const emailParts: string[] = control.value.split(partsSeparator);

        if (emailParts.length !== 2) {
            emailInvalid = true;
        } else {
            for (const emailPart of emailParts) {
                if (emailPart.length > 64) {
                    emailInvalid = true;
                }
            }
        }
    }

    return emailInvalid ? {email: true} : null;
};
