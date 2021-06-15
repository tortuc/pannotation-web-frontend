import { Injectable } from '@angular/core';
import {
    CanLoad,
    Route,
    UrlSegment,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router, CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';

import { SessionStorage } from '../core/session/session-storage';
import { UserModel } from '../models/user/user-model';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribedGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private sessionStorage: SessionStorage) {}

    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
        const user: UserModel = this.sessionStorage.userStorage;

        if (!user.isSubscribed) {
            this.router.navigate(['/subscription']);
            return;
        }

        return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      const user: UserModel = this.sessionStorage.userStorage;

      if (!user.isSubscribed) {
          this.router.navigate(['/subscription']);
          return;
      }

      return true;
  }
}
