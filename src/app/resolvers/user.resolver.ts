import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { UserModel } from '../models/user/user-model';
import { UsersService } from '../services/users.service';
import { AppUser } from '../core/session/app-user';
import { SessionStorage } from '../core/session/session-storage';

@Injectable()
export class UserResolver implements Resolve<AppUser | UserModel> {
    constructor(private readonly usersService: UsersService,
                private readonly router: Router,
                private readonly sessionStorage: SessionStorage) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | AppUser {
        const appUser = this.sessionStorage.restore();
        let userId = route.params.id;

        if (userId === 'me' && !appUser) {
            return EMPTY.pipe(
                finalize(() => this.router.navigate(['/']))
            );
        } else if (userId === 'me') {
            userId = appUser.id;
        }

        return this.usersService.getOne(userId).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 404) {
                    this.router.navigate(['/404']);
                    return throwError(err);
                }
            })
        );
    }
}
