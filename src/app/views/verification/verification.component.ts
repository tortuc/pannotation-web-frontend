import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { VerificationsService } from '../../services/verifications.service';
import { SessionStorage } from '../../core/session/session-storage';
import { delay, tap } from 'rxjs/operators';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['../../../styles/shared/auth.styles.scss', './verification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationComponent implements OnInit {
    readonly failed = new BehaviorSubject<boolean>(true);
    readonly icKeyNote = '/assets/img/ic-key-note-light-gray.svg';
    private readonly token: string;
    private readonly email: string;

    constructor(
        private verificationsService: VerificationsService,
        private router: Router,
        private sessionsStorage: SessionStorage,
        private activatedRoute: ActivatedRoute) {
        this.token = this.activatedRoute.snapshot.queryParamMap.get('token') as string | undefined;
        this.email = this.activatedRoute.snapshot.queryParamMap.get('email') as string | undefined;
    }

    ngOnInit() {
        this.verifyUser();
    }

    private verifyUser(): void {
        if (!this.token || !this.email) {
            this.failed.next(true);
            this.router.navigate(['/sign-up']);
            return;
        }

        this.verificationsService.verify(this.token, this.email)
            .pipe(
                tap(({ data }: any) => {
                    this.sessionsStorage.store(data);
                    this.failed.next(false);
                }),
                delay(2000),
            )
            .subscribe(
                () => this.router.navigate(['/complete-profile']),
                () => this.router.navigate(['/sign-up'])
            );
    }
}
