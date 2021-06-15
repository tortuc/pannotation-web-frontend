import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

import { PasswordResetComponent } from './form/form.component';
import { ResetPasswordRouter } from './reset-password.router';
import { VerificationsService } from '../../services/verifications.service';
import { ViewContainerModule } from '../../libs/view-container/view-container.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
            validators: [
                { name: 'email', validation: Validators.email },
            ]
        }),
        ViewContainerModule,
        FormlyBootstrapModule,
        TranslateModule.forChild(),
        RouterModule.forChild(ResetPasswordRouter)
    ],
    providers: [VerificationsService],
    declarations: [PasswordResetComponent]
})
export class ResetPasswordModule {
}
