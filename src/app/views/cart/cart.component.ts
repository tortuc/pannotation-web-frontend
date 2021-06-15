import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { CartModel } from '../../models/cart/cart-model';
import { CartItem } from '../../models/cart/cart-item';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
    readonly cart: Observable<CartModel>;

    constructor(private readonly cartService: CartService) {
        this.cart = this.cartService.cart;
    }

    deleteItem(id: number): void {
        this.cartService.deleteFromCart(id)
            .subscribe(() => this.cartService.refresh());
    }

    trackById(index: number, item: CartItem) {
        return item.id;
    }
}
