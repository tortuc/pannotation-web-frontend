import { Songsheet } from '../songsheet/songsheet';

export interface CartPayment {
    readonly orderId: number;
    readonly orderAmount: number;
    readonly status: string;
    readonly paymentMethod: PaymentMethod;
    readonly songsheets: Songsheet[];
}

export interface PaymentBilling {
    readonly country: string;
    readonly state: string;
    readonly city: string;
    readonly address: string;
    readonly zip: string;
}

export interface PaymentMethod {
    readonly cardMask: string;
    readonly cardType: string;
}
