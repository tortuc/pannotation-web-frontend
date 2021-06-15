import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';

import { getFields, getModel } from './sign-in.configs';
import { FormModel } from './sign-in.model';
import { AuthService } from '../../../services/auth.service';
import { SessionStorage } from '../../../core/session/session-storage';
import { AppUser } from '../../../core/session/app-user';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../../../../styles/shared/auth.styles.scss', './sign-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
    form: FormGroup;
    model: FormModel;
    fields: FormlyFieldConfig[];

    constructor(private readonly authService: AuthService,
                private readonly sessionStorage: SessionStorage,
                private readonly activatedRoute: ActivatedRoute,
                private readonly translateService: TranslateService,
                private readonly router: Router) {
        this.initForm();
    }

    submit(data: FormModel): void {
        if (this.form.invalid) {
            return;
        }
        this.form.disable();
        this.authService.signIn(data)
            .pipe(
                switchMap((response: AppUser) => {
                    this.sessionStorage.store(response);
                    return this.authService.getProfile();
                })
            )
            .subscribe(
                (response: AppUser) => {
                    const userData = this.sessionStorage.restore();
                    const songsheetId = this.activatedRoute.snapshot.queryParams.songsheet;
                    const returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;

                    this.sessionStorage.store({ ...userData, ...response });

                    if (!!songsheetId && parseInt(songsheetId, 10)) {
                        this.router.navigate(['/music-scores', parseInt(songsheetId, 10)]);
                    } else if (!!returnUrl) {
                        this.router.navigate([returnUrl]);
                    } else {
                        this.router.navigate(['/']);
                    }
                },
                () => {
                    this.sessionStorage.destroy();
                    this.form.enable();
                }
            );
    }

    private initForm(): void {
        this.form = new FormGroup({});
        this.model = getModel();
        this.fields = getFields(this.translateService);
    }
}
