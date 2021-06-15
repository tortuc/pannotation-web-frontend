import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthenticatedSessionStorage, ProvideAccessToken, ProvideRefreshToken } from '../../libs/authenticated';
import { AppStorage } from '../../libs/storage/app-storage';
import { AppUser } from './app-user';
import { UserModel } from '../../models/user/user-model';

@Injectable()
export class SessionStorage implements AuthenticatedSessionStorage<AppUser>, ProvideAccessToken, ProvideRefreshToken {
    private readonly storage: BehaviorSubject<AppUser | undefined>;
    private appStorage = new AppStorage<AppUser>(localStorage, 'user');

    constructor() {
        this.storage = new BehaviorSubject(undefined);
    }

    get userChanges(): Observable<AppUser> {
        return this.storage.asObservable();
    }

    get userStorage(): AppUser {
        return this.storage.getValue();
    }

    restore(): AppUser | undefined {
        const item = this.appStorage.getItem();
        if (item) {
            return new AppUser(this.appStorage.getItem());
        }

        return;
    }

    store(session: AppUser): void {
        this.appStorage.setItem(session);
        this.storage.next(new AppUser(session));
    }

    updateUserInfo(user: UserModel): void {
        const item = this.appStorage.getItem();
        const newUser = new AppUser(Object.assign(item, user));
        this.appStorage.setItem(newUser);
        this.storage.next(newUser);
    }

    destroy(): void {
        this.appStorage.removeItem();
        this.storage.next(undefined);
    }

    provideAccessToken(): string | undefined {
        const user = this.storage.getValue();
        if (!user || !user.token) {
            return undefined;
        }

        return user.token.accessToken;
    }

    provideRefreshToken(): string | undefined {
        const user = this.storage.getValue();
        if (!user) {
            return undefined;
        }

        return user.token.refreshToken;
    }
}
