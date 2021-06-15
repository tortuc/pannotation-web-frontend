import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { RouterModule } from '@angular/router';

import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { DropdownModule } from '../../components/dropdown/dropdown.module';
import { CheckoutComponent } from './checkout.component';
import { OrderCardModule } from '../cart/order-card/order-card.module';
import { ThanksPurchasingCartComponent } from './thanks-purchasing-cart/thanks-purchasing-cart.component';
import { ThanksPurchasingSubscriptionComponent } from './thanks-purchasing-subscription/thanks-purchasing-subscription.component';
import { PaymentsService } from '../../services/payments.service';
import { OrdersService } from '../../services/orders.service';

@NgModule({
    declarations: [
        CheckoutComponent,
        ThanksPurchasingSubscriptionComponent,
        ThanksPurchasingCartComponent
    ],
    imports: [
        CommonModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
            types: [
                { name: 'dropdown', component: DropdownComponent },
            ],
        }),
        ReactiveFormsModule,
        OrderCardModule,
        RouterModule,
        FormlyBootstrapModule,
        DropdownModule,
        FormsModule
    ],
    exports: [
        CheckoutComponent
    ],
    providers: [
        PaymentsService,
        OrdersService
    ]
})
export class CheckoutModule {
}
