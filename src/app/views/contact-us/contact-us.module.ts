import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutes } from './contact-us.routing';
import { SystemService } from '../../services/system.service';

@NgModule({
    declarations: [ContactUsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ContactUsRoutes),
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
        }),
        FormsModule,
        FormlyBootstrapModule,
    ],
    providers: [SystemService]
})
export class ContactUsModule {
}
