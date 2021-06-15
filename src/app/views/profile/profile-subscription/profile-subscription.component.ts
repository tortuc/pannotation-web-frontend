import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionStatus } from 'src/app/models/subscriptions/subscription-status';
import { SessionStorage } from 'src/app/core/session/session-storage';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-profile-subscription',
    templateUrl: './profile-subscription.component.html',
    styleUrls: ['./profile-subscription.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSubscriptionComponent {
    subscriptionStatus: SubscriptionStatus;
    readonly subscriptionCheckbox: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly sessionsStorage: SessionStorage) {
        const { subscriptionStatus } = activatedRoute.snapshot.data;
        this.subscriptionStatus = subscriptionStatus;

        this.updateUserSubscribed();
    }

    handleOption(/*optionSelected*/): void {
        this.router.navigate(['/subscription/checkout']);
    }

    private updateUserSubscribed() {
        const user = this.sessionsStorage.restore();

        if (user.isSubscribed !== this.subscriptionStatus.isSubscribed) {
            user.isSubscribed = this.subscriptionStatus.isSubscribed;
            this.sessionsStorage.updateUserInfo(user);
        }
    }

    subscriptionCheckboxChange(): void {
        this.subscriptionCheckbox.next(!this.subscriptionCheckbox.getValue());
    }
}
