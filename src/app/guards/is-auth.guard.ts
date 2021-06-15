import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { SessionStorage } from '../core/session/session-storage';

@Injectable({
    providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {

    constructor(private sessionStorage: SessionStorage,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.sessionStorage.restore()) {
            this.router.navigate(['/']);
            return;
        }
        return true;
    }
}
