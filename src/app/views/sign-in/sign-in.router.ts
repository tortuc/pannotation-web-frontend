import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { IsAuthGuard } from '../../guards/is-auth.guard';

export const SignInRouter: Routes = [
    {
        path: '',
        component: SignInComponent,
        canActivate: [IsAuthGuard]
    }
];
