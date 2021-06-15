import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { CartPaymentModel } from '../../../models/cart/cart-payment-model';
import { SessionStorage } from '../../../core/session/session-storage';
import { UserModel } from '../../../models/user/user-model';

@Component({
    selector: 'app-thanks-purchasing-cart',
    templateUrl: './thanks-purchasing-cart.component.html',
    styleUrls: ['./thanks-purchasing-cart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThanksPurchasingCartComponent {
    @Input() details: CartPaymentModel;
    readonly user: Observable<UserModel>;

    constructor(private readonly sessionStorage: SessionStorage) {
        this.user = sessionStorage.userChanges;
    }
}
