import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, tap, finalize, shareReplay } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthenticatedSessionStorage } from './authenticated-session-storage';
import { SessionRefresher } from './session-refresher';
import { Authenticator } from './authenticator';
import { ShouldAuthenticate } from './should-authenticate';
import { ProvideRefreshToken } from './provide-refresh-token';
import {
    AUTHENTICATED_SESSION_STORAGE,
    SESSION_REFRESHER,
    REQUEST_AUTHENTICATOR,
    SHOULD_AUTHENTICATE,
    PROVIDE_REFRESH_TOKEN
} from './tokens';

enum HttpStatus {
    Unauthorized = 401
}

@Injectable()
export class UnauthorizedInterceptor<T> implements HttpInterceptor {
    private pendingRequest: Observable<T>;

    constructor(@Inject(AUTHENTICATED_SESSION_STORAGE) private readonly sessionStorage: AuthenticatedSessionStorage<T>,
                @Inject(SESSION_REFRESHER) private readonly refresher: SessionRefresher<T>,
                @Inject(REQUEST_AUTHENTICATOR) private readonly authenticator: Authenticator,
                @Inject(SHOULD_AUTHENTICATE) private readonly shouldAuthenticate: ShouldAuthenticate,
                @Inject(PROVIDE_REFRESH_TOKEN) private readonly refreshTokenProvider: ProvideRefreshToken) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    if (response.status !== HttpStatus.Unauthorized || !this.shouldAuthenticate.shouldAuthenticate(req)) {
                        return throwError(response);
                    }

                    const refreshToken = this.refreshTokenProvider.provideRefreshToken();
                    if (!refreshToken) {
                        return throwError(response);
                    }

                    if (!this.pendingRequest) {
                        this.pendingRequest = this.refresher.refresh(next, refreshToken)
                            .pipe(
                                finalize(() => this.pendingRequest = undefined),
                                catchError((error) => {
                                    this.sessionStorage.destroy();
                                    return throwError(error);
                                }),
                                shareReplay()
                            );
                    }

                    return this.pendingRequest
                        .pipe(
                            tap((session) => this.sessionStorage.store(session)),
                            switchMap(() => {
                                const retryReq = this.authenticator.authenticate(req);
                                return next.handle(retryReq);
                            })
                        );
                })
            );
    }
}
