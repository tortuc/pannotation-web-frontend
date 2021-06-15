import { HttpHandler, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map, filter, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { ResponseModel } from 'src/app/models/response/response';
import { AppUser } from './app-user';
import { SessionRefresher } from '../../libs/authenticated';
import { SessionStorage } from './session-storage';
import { Session } from '../../models/sessions/session';
import { API_URL_TOKEN } from 'src/app/libs/tokens';

@Injectable()
export class RefreshSessionService implements SessionRefresher<AppUser> {
    private endpoint = '/sessions';

    private get endpointUrl(): string {
        return this.apiUrl + this.endpoint;
    }

    constructor(private sessionStorage: SessionStorage,
                private router: Router,
                @Inject(API_URL_TOKEN) private readonly apiUrl: string) {
    }

    refresh(handler: HttpHandler, refreshToken: string): Observable<AppUser> {
        const request = new HttpRequest('PUT', this.endpointUrl, { refreshToken });
        return handler.handle(request)
            .pipe(
                filter((event) => event.type === HttpEventType.Response),
                catchError((error) => {
                    this.router.navigate(['/sign-in']);
                    return throwError(error);
                }),
                map((response: HttpResponse<ResponseModel<Session>>) => {
                    const user = this.sessionStorage.restore();

                    if (user) {
                        return new AppUser(Object.assign(user, response.body.data));
                    }

                    return new AppUser({
                        id: 0,
                        email: '',
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        mobileNumber: '',
                        country: '',
                        state: '',
                        city: '',
                        address: '',
                        zip: '',
                        isComposer: false,
                        idCode: '',
                        isSubscribed: false,
                        isBlocked: false,
                        avatar: null,
                        role: '',
                    });
                })
            );
    }
}
