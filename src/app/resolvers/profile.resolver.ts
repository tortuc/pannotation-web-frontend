import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserModel } from '../models/user/user-model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ProfileResolver implements Resolve<UserModel> {
    constructor(private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> {
        return this.authService.getProfile();
    }
}
