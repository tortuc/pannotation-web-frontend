import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';

import { SubscriptionComponent } from './subscription.component';
import { subscriptionRoutes } from './subscription-router.module';
import { CommonInfoService } from '../../services/common-info.service';
import { CommonInfoResolver } from '../../resolvers/common-info.resolver';
import { CheckoutModule } from '../checkout/checkout.module';
import { SubscriptionStatusResolver } from 'src/app/resolvers/subscription-status.resolver';
import { UsersService } from 'src/app/services/users.service';
import { ActiveSubscriptionModule } from 'src/app/components/active-subscription/active-subscription.module';
import { SubscribedGuard } from '../../guards/subscribed.guard';

@NgModule({
    declarations: [SubscriptionComponent],
    imports: [
        CommonModule,
        CollapseModule.forRoot(),
        RouterModule.forChild(subscriptionRoutes),
        CheckoutModule,
        ActiveSubscriptionModule
    ],
    providers: [
        CommonInfoResolver,
        CommonInfoService,
        UsersService,
        SubscriptionStatusResolver,
        SubscribedGuard
    ]
})
export class SubscriptionModule {
}
