import { UserModel } from '../../models/user/user-model';
import { Token } from './token';

export class AppUser extends UserModel {
    token?: Token;

    constructor(appUser: Readonly<AppUser>) {
        super(appUser);
        this.token = appUser.token;
    }
}
