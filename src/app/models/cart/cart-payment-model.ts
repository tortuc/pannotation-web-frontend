import { CartPayment, PaymentBilling, PaymentMethod } from './cart-payment';
import { SongsheetModel } from '../songsheet/songsheet-model';
import { Songsheet } from '../songsheet/songsheet';

class PaymentBillingModel {
    readonly country: string;
    readonly state: string;
    readonly city: string;
    readonly address: string;
    readonly zip: string;
    constructor(data: PaymentBilling) {
        this.country = data.country;
        this.state = data.state;
        this.city = data.city;
        this.address = data.address;
        this.zip = data.zip;
    }
}

class PaymentMethodModel {
    readonly cardMask: string;
    readonly cardType: string;
    constructor(data: PaymentMethod) {
        this.cardMask = data.cardMask;
        this.cardType = data.cardType;
    }
}

export class CartPaymentModel {
    readonly orderId: number;
    readonly orderAmount: number;
    readonly status: string;
    readonly paymentMethod: PaymentMethodModel;
    readonly songsheets: SongsheetModel[];

    constructor(data: CartPayment) {
        this.orderId = data.orderId;
        this.orderAmount = data.orderAmount;
        this.status = data.status;
        this.songsheets = data.songsheets.map((s: Songsheet) => new SongsheetModel(s));

        if (data.paymentMethod) {
            this.paymentMethod = new PaymentMethodModel(data.paymentMethod);
        }
    }
}
