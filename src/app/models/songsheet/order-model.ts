import { Order } from './order';

export class OrderModel implements Order {
    readonly order: string;
    readonly column: string;
}
