export interface Session {
    readonly accessToken: string;
    readonly expireAt: string;
    readonly refreshToken: string;
}
