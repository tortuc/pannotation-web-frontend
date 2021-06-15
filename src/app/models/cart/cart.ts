import { CartItem } from './cart-item';

export interface Cart {
    readonly totalAmount: number;
    readonly items: CartItem[];
}
