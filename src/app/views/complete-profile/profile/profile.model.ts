export interface ProfileModel {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    mobileNumber: string;
    idCode: string;
    country: string;
    state: string;
    city: string;
    address: string;
    zip: string;
    isComposer: boolean;
    imageId: number;
}

export enum FillingStep {
    step1 = 1,
    step2
}
