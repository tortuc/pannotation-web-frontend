import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AngularCropperjsModule } from 'angular-cropperjs';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddCardComponent } from './add-card/add-card.component';
import { FillProfileComponent } from './fill-profile/fill-profile.component';
import { ImageCropComponent } from './image-crop/image-crop.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
                { name: 'email', message: 'Email is not in valid format'},
            ],
            validators: [
                { name: 'email', validation: Validators.email },
            ]}),
        FormlyBootstrapModule,
        TranslateModule.forChild(),
        AngularCropperjsModule
    ],
    declarations: [
        FillProfileComponent,
        ConfirmationDialogComponent,
        AddCardComponent,
        ImageCropComponent
    ],
    exports: [
        FillProfileComponent,
        ConfirmationDialogComponent,
        AddCardComponent,
        ImageCropComponent
    ],
    entryComponents: [
        FillProfileComponent,
        ConfirmationDialogComponent,
        AddCardComponent,
        ImageCropComponent
    ],
    providers: [
    ]
})
export class ModalsModule {
}
