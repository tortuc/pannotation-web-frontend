import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionStorage } from '../core/session/session-storage';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private sessionStorage: SessionStorage,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.sessionStorage.restore()) {
            this.router.navigate(['/sign-in']);
            return;
        }
        return true;
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.sessionStorage.restore()) {
            this.router.navigate(['/sign-in']);
            return;
        }
        return true;
    }
}
