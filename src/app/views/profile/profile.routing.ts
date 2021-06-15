import { Route } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { CommonInfoResolver } from '../../resolvers/common-info.resolver';
import { SubscriptionStatusResolver } from 'src/app/resolvers/subscription-status.resolver';

export const ProfileRoutes: Route[] = [
    {
        path: '',
        component: ProfileComponent,
        resolve: {
            countriesList: CommonInfoResolver,
            subscriptionStatus: SubscriptionStatusResolver,
        }
    }
];
