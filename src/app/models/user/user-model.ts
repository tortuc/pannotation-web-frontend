import { User } from './user';
import { ImageResponseModel } from '../image';

export class UserModel implements User {
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
    isSubscribed: boolean;
    readonly isBlocked: boolean;
    readonly avatar?: ImageResponseModel;
    readonly role?: string;

    constructor (user: User) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phoneNumber = user.phoneNumber;
        this.mobileNumber = user.mobileNumber;
        this.country = user.country;
        this.state = user.state;
        this.city = user.city;
        this.address = user.address;
        this.zip = user.zip;
        this.isComposer = user.isComposer;
        this.idCode = user.idCode;
        this.isSubscribed = user.isSubscribed;
        this.isBlocked = user.isBlocked;
        this.avatar = user.avatar;
    }
}
