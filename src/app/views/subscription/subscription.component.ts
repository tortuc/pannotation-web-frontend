import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Faq } from '../../models/faq/faq';
import { SessionStorage } from 'src/app/core/session/session-storage';
import { SubscriptionStatus } from 'src/app/models/subscriptions/subscription-status';
import { BehaviorSubject } from 'rxjs';

interface SubscriptionIterface {
    inverted: boolean;
    title: string;
    description: string;
    price: string;
    btnLabel: string;
}

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionComponent {
    readonly icKeyNote = '/assets/img/ic-key-note-light-gray.svg';
    readonly subscriptionContext: SubscriptionIterface[];
    readonly subscriptionCheckbox: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    subscriptionStatus: SubscriptionStatus;

    readonly faqContext: Faq[];

    constructor(private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly sessionsStorage: SessionStorage) {

        const { subscriptionStatus } = activatedRoute.snapshot.data;

        if (subscriptionStatus) {
            this.subscriptionStatus = subscriptionStatus;
            this.updateUserSubscribed();
        }

        this.subscriptionContext = [
            {
                inverted: true,
                title: 'Monthly Subscription',
                description: 'Fully access all non-score materials including articles, media, podcasts, interviews and much more. ' +
                    'Get discounted rates on scores and upload materials at no additional cost.',
                price: '9.99',
                btnLabel: 'Subscribe'
            }
        ];

        this.faqContext = [
            new Faq(
                'Do you think there is an afterlife for animals other than human beings?',
                'Proper cookery renders good food material more digestible. When scientifically done, ' +
                'cooking changes each of the food elements, with the exception of fats, in much the same manner ' +
                'as do the digestive juices, and at the same time it breaks up the food by dissolving the soluble ' +
                'portions, so that its elements are more readily acted upon by the digestive fluids. Cookery, ' +
                'however, often fails to attain.'
            ),
            new Faq(
                'Do you think there is an afterlife for animals other than human beings?',
                'Proper cookery renders good food material more digestible. When scientifically done, ' +
                'cooking changes each of the food elements, with the exception of fats, in much the same manner ' +
                'as do the digestive juices, and at the same time it breaks up the food by dissolving the soluble portions, ' +
                'so that its elements are more readily acted upon by the digestive fluids. Cookery, however, often fails to attain.'
            ),
            new Faq(
                'Do you think there is an afterlife for animals other than human beings?',
                'Proper cookery renders good food material more digestible. When scientifically done, ' +
                'cooking changes each of the food elements, with the exception of fats, in much the same manner ' +
                'as do the digestive juices, and at the same time it breaks up the food by dissolving the soluble ' +
                'portions, so that its elements are more readily acted upon by the digestive fluids. Cookery, ' +
                'however, often fails to attain.'
            ),
            new Faq(
                'Do you think there is an afterlife for animals other than human beings?',
                'Proper cookery renders good food material more digestible. When scientifically done, ' +
                'cooking changes each of the food elements, with the exception of fats, in much the same manner ' +
                'as do the digestive juices, and at the same time it breaks up the food by dissolving the soluble ' +
                'portions, so that its elements are more readily acted upon by the digestive fluids. Cookery, ' +
                'however, often fails to attain.'
            ),
            new Faq(
                'Do you think there is an afterlife for animals other than human beings?',
                'Proper cookery renders good food material more digestible. When scientifically done, ' +
                'cooking changes each of the food elements, with the exception of fats, in much the same manner ' +
                'as do the digestive juices, and at the same time it breaks up the food by dissolving the soluble ' +
                'portions, so that its elements are more readily acted upon by the digestive fluids. Cookery, ' +
                'however, often fails to attain.'
            ),
            new Faq(
                'Do you think there is an afterlife for animals other than human beings?',
                'Proper cookery renders good food material more digestible. When scientifically done, ' +
                'cooking changes each of the food elements, with the exception of fats, in much the same manner ' +
                'as do the digestive juices, and at the same time it breaks up the food by dissolving the soluble ' +
                'portions, so that its elements are more readily acted upon by the digestive fluids. Cookery, ' +
                'however, often fails to attain.'
            ),
            new Faq(
                'Do you think there is an afterlife for animals other than human beings?',
                'Proper cookery renders good food material more digestible. When scientifically done, ' +
                'cooking changes each of the food elements, with the exception of fats, in much the same manner ' +
                'as do the digestive juices, and at the same time it breaks up the food by dissolving the soluble ' +
                'portions, so that its elements are more readily acted upon by the digestive fluids. Cookery, ' +
                'however, often fails to attain.'
            ),
        ];
    }

    handleOption(/*optionSelected*/): void {

        if (!this.sessionsStorage.restore()) {
            this.router.navigate(['/sign-in'], {queryParams: { returnUrl: '/subscription/checkout'}});
            return;
        }

        this.router.navigate(['/subscription/checkout']);
    }

    subscriptionCheckboxChange(): void {
        this.subscriptionCheckbox.next(!this.subscriptionCheckbox.getValue());
    }

    private updateUserSubscribed() {
        const user = this.sessionsStorage.restore();

        if (user.isSubscribed !== this.subscriptionStatus.isSubscribed) {
            user.isSubscribed = this.subscriptionStatus.isSubscribed;
            this.sessionsStorage.updateUserInfo(user);
        }
    }
}
