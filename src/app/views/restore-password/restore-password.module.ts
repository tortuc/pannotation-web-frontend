import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';

import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { RestorePasswordRouter } from './restore-password.router';
import { VerificationsService } from '../../services/verifications.service';
import { ViewContainerModule } from '../../libs/view-container/view-container.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
        }),
        ViewContainerModule,
        FormlyBootstrapModule,
        TranslateModule.forChild(),
        RouterModule.forChild(RestorePasswordRouter)
    ],
    providers: [VerificationsService],
    declarations: [RestorePasswordComponent]
})
export class RestorePasswordModule {
}
