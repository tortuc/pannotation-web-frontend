import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { getFields, getModel } from './restore-password.configs';
import { RestorePasswordModel } from './restore-password.model';
import { VerificationsService } from '../../../services/verifications.service';
import { NotificationService } from '../../../services/notification.service';
import { FormBase } from '../../../core/classes/form-base';

@Component({
    selector: 'app-restore-password',
    templateUrl: './restore-password.component.html',
    styleUrls: ['../../../../styles/shared/auth.styles.scss', './restore-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestorePasswordComponent extends FormBase {
    readonly icKeyNote = '/assets/img/ic-key-note-light-gray.svg';
    form: FormGroup;
    model: RestorePasswordModel;
    fields: FormlyFieldConfig[];
    readonly isSuccessful = new BehaviorSubject<boolean>(false);
    readonly failed = new BehaviorSubject<boolean>(false);

    private email: string;
    private token: string;

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly router: Router,
                private translate: TranslateService,
                private readonly notificationService: NotificationService,
                private readonly verificationsService: VerificationsService) {
        super();
        this.initForm();
    }

    submit({password}: RestorePasswordModel): void {
        this.submitBtnDissabled.next(true);
        this.verificationsService.restore(this.email, this.token, password)
            .subscribe(
                () => {
                this.notificationService.open('Password.Successful');
                this.submitBtnDissabled.next(false);
                this.router.navigate(['/sign-in']);
            },
                () => this.submitBtnDissabled.next(false)
            );
    }

    private initForm(): void {
        this.form = new FormGroup({});
        this.model = getModel();
        this.fields = getFields(this.translate);
        this.email = this.activatedRoute.snapshot.queryParamMap.get('email') as string | undefined;
        this.token = this.activatedRoute.snapshot.queryParamMap.get('token') as string | undefined;
        this.verifyToken();
    }

    private verifyToken(): void {
        if (!this.token || !this.email) {
            this.failed.next(true);
            return;
        }

        this.verificationsService.verifyToken(this.email, this.token)
            .subscribe(
                () => {
                    // do nothing
                },
                () => this.failed.next(true)
            );
    }
}
