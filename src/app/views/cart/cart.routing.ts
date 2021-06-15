import { Route } from '@angular/router';

import { CartComponent } from './cart.component';
import { AuthGuard } from '../../guards/auth.guard';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CommonInfoResolver } from '../../resolvers/common-info.resolver';
import { CheckoutPage } from '../../core/enums/checkout-page.enum';

export const CartRoutes: Route[] = [
    {
        path: '',
        component: CartComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
        resolve: {
            countriesList: CommonInfoResolver,
        },
        data: {
            page: CheckoutPage.Cart
        }
    }
];
