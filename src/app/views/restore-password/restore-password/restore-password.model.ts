export interface RestorePasswordModel {
    readonly password: {
        password: string;
        confirmPassword: string;
    };
}
