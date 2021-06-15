export interface PaymentPayload {
    readonly firstName: string;
    readonly lastName: string;
    readonly countryCode: number | string;
    readonly state: string;
    readonly city: string;
    readonly address: string;
    readonly zip: number;
    readonly cvv: string;
    readonly number: string;
    readonly cardType: string;
    readonly expirationDate: string;
    readonly countryName: string;
}
