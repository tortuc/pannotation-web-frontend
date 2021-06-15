import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from 'angular2-toaster';

import { ProfileSettingsModel } from './profile-settings.model';
import { getFields, getModel } from './profile-settings.config';
import { AuthService } from '../../../services/auth.service';
import { FormBase } from '../../../core/classes/form-base';
import { resetForm } from '../../../core/helpers/form-helper';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsComponent extends FormBase {
    settingsForm: FormGroup;
    model: ProfileSettingsModel;
    fields: FormlyFieldConfig[];

    constructor(private translate: TranslateService,
                private readonly toasterService: ToasterService,
                private readonly changeDetectorRef: ChangeDetectorRef,
                private readonly authService: AuthService) {
        super();
        this.initForm();
    }

    submit(form: ProfileSettingsModel) {
        this.submitBtnDissabled.next(true);
        this.authService.changePassword(form)
            .subscribe(
                () => {
                    this.toasterService.pop('success', 'Password changed successffuly!');
                    this.submitBtnDissabled.next(false);
                    resetForm(this.settingsForm);
                    this.changeDetectorRef.detectChanges();
                },
                () => this.submitBtnDissabled.next(false)
            );
    }

    private initForm(): void {
        this.settingsForm = new FormGroup({});
        this.model = getModel();
        this.fields = getFields(this.translate);
    }
}
