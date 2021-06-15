import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersService } from '../services/users.service';
import { SubscriptionStatus } from '../models/subscriptions/subscription-status';
import { SessionStorage } from '../core/session/session-storage';

@Injectable()
export class SubscriptionStatusResolver implements Resolve<SubscriptionStatus> {
    constructor(private usersService: UsersService,
        private readonly sessionsStorage: SessionStorage) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubscriptionStatus> {
        if (this.sessionsStorage.restore()) {
            return this.usersService.checkSubscription();
        }
    }
}
