import { CartItem } from './cart-item';
import { CartItemModel } from './cart-item-model';
import { Cart } from './cart';

export class CartModel {
    readonly totalAmount: number;
    readonly items: CartItemModel[];

    constructor(data: Cart) {
        this.totalAmount = data.totalAmount;
        this.items = data.items.map((i: CartItem) => new CartItemModel(i));
    }

    get showFilledCart() {
        return this.items.length > 0;
    }

    get orderDate() {
        return Date.now();
    }

    get itemsTypo() {
        return this.items.length === 1 ? 'item' : 'items';
    }
}
