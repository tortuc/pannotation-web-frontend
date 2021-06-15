export interface ProfileSettingsModel {
    readonly currentPassword: string;
    readonly password: {
        password: string;
        confirmPassword: string;
    };
}
