import { ImageResponseModel } from '../image';

export interface User {
    readonly id: number;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly phoneNumber: string;
    readonly mobileNumber?: string;
    readonly country: string;
    readonly state: string;
    readonly city: string;
    readonly address: string;
    readonly zip: string;
    readonly isComposer: boolean;
    readonly idCode?: string;
    readonly isSubscribed: boolean;
    readonly isBlocked: boolean;
    readonly avatar?: ImageResponseModel;
}
