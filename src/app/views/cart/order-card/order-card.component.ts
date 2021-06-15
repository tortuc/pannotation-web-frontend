import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { CartModel } from '../../../models/cart/cart-model';
import { CartService } from 'src/app/services/cart.service';
import { CartPaymentModel } from 'src/app/models/cart/cart-payment-model';

@Component({
    selector: 'app-order-card',
    templateUrl: './order-card.component.html',
    styleUrls: ['./order-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCardComponent implements OnChanges {
    @Input() cart: CartModel;
    @Input() checkout?: boolean;
    @Input() disabled = false;
    @Output() changeCardPurshasingData?: EventEmitter<void> = new EventEmitter();
    isCartFree: boolean;

    constructor(private readonly router: Router,
        private readonly cartService: CartService,
        ) { }

    ngOnChanges({ cart }: SimpleChanges) {
        if (cart && cart.currentValue) {
            this.isCartFree = (cart.currentValue.totalAmount === 0);
        }
    }

    onSubmitClick(): void {
        if (this.checkout) {
            this.changeCardPurshasingData.emit();
        } else {
            if (this.isCartFree) {
                // pay for free cart
                this.cartService.payFreeCart()
                    .subscribe((paymentDetails: CartPaymentModel) => {
                        this.cartService.refresh();
                        this.router.navigate(['cart', 'checkout'], {
                            queryParams: {
                                'order-id': paymentDetails.orderId
                            }
                        });
                    });
            } else {
                this.router.navigate(['cart', 'checkout']);
            }
        }
    }
}
