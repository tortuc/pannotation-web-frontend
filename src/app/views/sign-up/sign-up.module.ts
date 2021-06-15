import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';

import { FormComponent } from './form/form.component';
import { SignUpRouter } from './sign-up.router';
import { UsersService } from '../../services/users.service';
import { VerificationsService } from '../../services/verifications.service';
import { ViewContainerModule } from 'src/app/libs/view-container/view-container.module';
import { FacebookLoginService } from '../../services/facebook.service';
import { SocialService } from '../../services/social.service';
import { GoogleLoginService } from '../../services/google.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
            validators: [
                { name: 'email', validation: Validators.email },
            ]}),
        FormlyBootstrapModule,
        RouterModule.forChild(SignUpRouter),
        ViewContainerModule
    ],
    providers: [
        UsersService,
        FacebookLoginService,
        GoogleLoginService,
        VerificationsService,
        SocialService
    ],
    declarations: [FormComponent]
})
export class SignUpModule {
}
