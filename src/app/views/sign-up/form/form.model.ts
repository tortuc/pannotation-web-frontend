export interface FormModel {
    readonly name: string;
    readonly surname: string;
    readonly email: string;
    readonly password: {
        password: string;
        passwordConfirm: string;
    };
}
