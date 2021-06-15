import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { SessionStorage } from '../core/session/session-storage';
import { UserRole } from '../models/user/user-roles';

@Injectable()
export class ProviderGuard implements CanActivate {

    constructor(private sessionStorage: SessionStorage,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.sessionStorage.restore() || this.sessionStorage.restore().role !== UserRole.Provider.toString()) {
            this.router.navigate(['/']);
            return;
        }
        return true;
    }
}
