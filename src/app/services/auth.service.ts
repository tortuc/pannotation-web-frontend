import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response/response';
import { Credentials } from '../models/credentials/credentials';
import { AppUser } from '../core/session/app-user';
import { API_URL_TOKEN } from '../libs/tokens';
import { UserModel } from '../models/user/user-model';
import { ProfileEditModel } from '../views/profile/profile-edit/profile-edit.model';
import { ProfileSettingsModel } from '../views/profile/profile-settings/profile-settings.model';

@Injectable()
export class AuthService {
    private readonly endpoint = '/sessions';

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    signIn(credentials: Credentials): Observable<AppUser> {
        return this.httpClient
            .post<ResponseModel<AppUser>>(this.apiEndpoint, credentials)
            .pipe(
                map(({ data }: ResponseModel<AppUser>) => new AppUser(data))
            );
    }

    getProfile(): Observable<UserModel> {
        return this.httpClient
            .get(`${this.apiUrl}/users/me/profile`)
            .pipe(
                map(({ data }: ResponseModel<AppUser>) => new UserModel(data))
            );
    }

    patchProfile(payload: ProfileEditModel): Observable<UserModel> {
        return this.httpClient
            .patch(`${this.apiUrl}/users/me/profile`, payload)
            .pipe(
                map(({ data }: ResponseModel<AppUser>) => new UserModel(data))
            );
    }

    deletePhoto(): Observable<UserModel> {
        return this.httpClient
            .delete(`${this.apiUrl}/users/me/profile/avatar`)
            .pipe(
                map(({ data }: ResponseModel<AppUser>) => new UserModel(data))
            );
    }

    changePassword(payload: ProfileSettingsModel): Observable<Object> {
        const { currentPassword, password: { password, confirmPassword }} = payload;

        return this.httpClient
            .put(`${this.apiUrl}/users/me/password`, { password, currentPassword, confirmPassword });
    }

    logout(): Observable<null> {
        return this.httpClient
            .delete<ResponseModel<AppUser>>(this.apiEndpoint)
            .pipe(map(() => null));
    }
}
