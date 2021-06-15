import { User } from '../user/user';
import { Session } from './session';

export interface UserSession {
    user: User;
    session: Session;
}
