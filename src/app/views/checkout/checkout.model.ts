export interface CheckoutPaymentModel {
    readonly firstName: string;
    readonly lastName: string;
    readonly cardNumber: number;
    readonly mmYY: string;
    readonly cvv: number;
}

export interface BillingAddressModel {
    readonly address: string;
    readonly country: string;
    readonly city: string;
    readonly state: string;
    readonly zip: number;
}
