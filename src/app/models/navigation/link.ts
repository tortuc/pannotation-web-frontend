import { UserRole } from '../user/user-roles';
import { LinkTypes } from './link-types';

export interface NavigationLink {
    type: LinkTypes;
    name: string;
    role?: UserRole;
    url?: string | string[];
    options?: {
        name: string;
        role?: UserRole;
        url: string | string[];
    }[];
}
