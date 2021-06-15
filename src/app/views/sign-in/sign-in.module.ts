import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';

import { SignInRouter } from './sign-in.router';
import { AuthService } from '../../services/auth.service';

import {
    maxlengthValidationMessage,
    maxValidationMessage,
    minlengthValidationMessage,
    minValidationMessage
} from '../../core/validation/rules';
import { ViewContainerModule } from 'src/app/libs/view-container/view-container.module';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
                { name: 'minlength', message: minlengthValidationMessage },
                { name: 'maxlength', message: maxlengthValidationMessage },
                { name: 'min', message: minValidationMessage },
                { name: 'max', message: maxValidationMessage }
            ],
            validators: [
                { name: 'email', validation: Validators.email },
            ]
        }),
        FormlyBootstrapModule,
        RouterModule.forChild(SignInRouter),
        ViewContainerModule,
        TranslateModule.forChild()
    ],
    providers: [AuthService],
    declarations: [SignInComponent]
})
export class SignInModule {
}
