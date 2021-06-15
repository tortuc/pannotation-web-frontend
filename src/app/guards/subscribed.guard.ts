import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { SessionStorage } from '../core/session/session-storage';
import { UserModel } from '../models/user/user-model';
import { ProfileTabs } from '../core/enums/profile-tabs.enum';

@Injectable()
export class SubscribedGuard implements CanActivate {
    constructor(private sessionStorage: SessionStorage,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const user: UserModel = this.sessionStorage.userStorage;

        if (user && user.isSubscribed) {
            this.router.navigate(['/profile'], { queryParams: { active: ProfileTabs.Subscription}});
            return;
        }

        return true;
    }
}
