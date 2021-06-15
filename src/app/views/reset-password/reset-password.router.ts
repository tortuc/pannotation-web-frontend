import { Routes } from '@angular/router';

import { PasswordResetComponent } from './form/form.component';

export const ResetPasswordRouter: Routes = [
    {
        path: '',
        component: PasswordResetComponent
    }
];
