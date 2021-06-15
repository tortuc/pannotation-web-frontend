import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartComponent } from './cart.component';
import { CartRoutes } from './cart.routing';
import { CommonInfoResolver } from '../../resolvers/common-info.resolver';
import { CommonInfoService } from '../../services/common-info.service';
import { PaymentsService } from '../../services/payments.service';
import { CheckoutModule } from '../checkout/checkout.module';
import { OrderCardModule } from './order-card/order-card.module';

@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(CartRoutes),
        CheckoutModule,
        OrderCardModule
    ],
    providers: [
        CommonInfoResolver,
        CommonInfoService,
        PaymentsService
    ]
})
export class CartModule {
}
