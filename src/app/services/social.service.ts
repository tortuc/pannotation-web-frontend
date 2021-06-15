import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_TOKEN } from '../libs/tokens';
import { ResponseModel } from '../models/response/response';
import { AppUser } from '../core/session/app-user';
import { UserSession } from '../models/sessions/user-session';

@Injectable()
export class SocialService {
    private readonly endpoint = '/socials';

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    facebookLogin (token: string): Observable<AppUser> {
        return this.httpClient
            .post<ResponseModel<UserSession>>(`${this.apiEndpoint}/sessions/facebook`, {token})
            .pipe(map((response: ResponseModel<UserSession>) => new AppUser(Object.assign(response.data.user, response.data.session))));
    }

    googleLogin (token: string): Observable<AppUser> {
        return this.httpClient
            .post<ResponseModel<UserSession>>(`${this.apiEndpoint}/sessions/google`, {token})
            .pipe(map((response: ResponseModel<UserSession>) => new AppUser(Object.assign(response.data.user, response.data.session))));
    }

    complete (role: number, email?: string): Observable<AppUser> {
        let params = {
            role,
        };

        if (email) {
            params = Object.assign(params, {email});
        }

        return this.httpClient
            .put<ResponseModel<UserSession>>(`${this.apiEndpoint}/sessions`, params)
            .pipe(map((response: ResponseModel<UserSession>) => new AppUser(Object.assign(response.data.user, response.data.session))));
    }
}
