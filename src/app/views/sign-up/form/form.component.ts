import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { getModel, getFields } from './form.configs';
import { UsersService } from '../../../services/users.service';
import { FormModel } from './form.model';
import { VerificationsService } from '../../../services/verifications.service';
import { FormBase } from '../../../core/classes/form-base';

@Component({
    selector: 'app-sign-up',
    templateUrl: './form.component.html',
    styleUrls: ['../../../../styles/shared/auth.styles.scss', './form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent extends FormBase {
    form: FormGroup;
    model: FormModel;
    fields: FormlyFieldConfig[];
    isSuccessful = new BehaviorSubject<boolean>(false);
    readonly icKeyNote = '/assets/img/ic-key-note-light-gray.svg';

    private userEmail: string;

    constructor(
        private usersService: UsersService,
        private translate: TranslateService,
        private verificationsService: VerificationsService,
        private domsanitizer: DomSanitizer, ) {
        super();
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({});
        this.model = getModel();
        this.fields = getFields(this.translate, this.domsanitizer);
    }

    submit(data: FormModel): void {
        this.submitBtnDissabled.next(true);
        const postData = {
            firstName: data.name,
            lastName: data.surname,
            email: data.email,
            password: data.password.password,
            confirmPassword: data.password.passwordConfirm
        };

        this.userEmail = data.email;

        this.usersService
            .signUp(postData)
            .subscribe(
                () => {
                    this.isSuccessful.next(true);
                    this.submitBtnDissabled.next(false);
                },
                () => {
                    this.submitBtnDissabled.next(false);
                }
            );
    }

    setState(email: string) {
        this.userEmail = email;
        if (this.userEmail) {
            this.isSuccessful.next(true);
        }
    }

    resend(): void {
        this.verificationsService
            .resend(this.userEmail)
            .subscribe();
    }
}
