import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { getModel, getFields } from './form.configs';
import { FormModel } from './form.model';
import { VerificationsService } from '../../../services/verifications.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './form.component.html',
    styleUrls: ['../../../../styles/shared/auth.styles.scss', './form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordResetComponent {
    readonly icKeyNote = '/assets/img/ic-key-note-light-gray.svg';
    form: FormGroup;
    model: FormModel;
    fields: FormlyFieldConfig[];
    readonly isSuccessful = new BehaviorSubject<boolean>(false);

    constructor( private verificationsService: VerificationsService, private translate: TranslateService) {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({});
        this.model = getModel();
        this.fields = getFields(this.translate);
    }

    submit(data: FormModel): void {
        this.verificationsService.reset(data.email)
            .subscribe(() => this.isSuccessful.next(true));
    }
}
