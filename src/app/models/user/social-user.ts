import { UserRole } from './user-roles';

export interface SocialUser {
    readonly token?: string;
    readonly role: UserRole;
    readonly email: string;
}
