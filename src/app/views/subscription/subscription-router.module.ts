import { Routes } from '@angular/router';

import { SubscriptionComponent } from './subscription.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { AuthGuard } from '../../guards/auth.guard';
import { CommonInfoResolver } from '../../resolvers/common-info.resolver';
import { CheckoutPage } from '../../core/enums/checkout-page.enum';
import { SubscriptionStatusResolver } from 'src/app/resolvers/subscription-status.resolver';
import { SubscribedGuard } from '../../guards/subscribed.guard';

export const subscriptionRoutes: Routes = [
    {
        path: '',
        component: SubscriptionComponent,
        resolve: {
            subscriptionStatus: SubscriptionStatusResolver,
        }
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard, SubscribedGuard],
        resolve: {
            countriesList: CommonInfoResolver,
        },
        data: {
            page: CheckoutPage.Subscription
        }
    }
];
