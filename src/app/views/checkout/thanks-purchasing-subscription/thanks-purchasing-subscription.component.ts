import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { ProfileTabs } from '../../../core/enums/profile-tabs.enum';

@Component({
    selector: 'app-thanks-purchasing-subscription',
    templateUrl: './thanks-purchasing-subscription.component.html',
    styleUrls: ['./thanks-purchasing-subscription.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThanksPurchasingSubscriptionComponent {
    constructor(private readonly router: Router) {
            timer(2500)
            .subscribe(() => (
                this.router.navigate(['/profile'], { queryParams: { active: ProfileTabs.Subscription} }))
            );
    }
}
