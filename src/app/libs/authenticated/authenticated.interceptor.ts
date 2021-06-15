import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { REQUEST_AUTHENTICATOR } from './tokens';
import { Authenticator } from './authenticator';

@Injectable()
export class AuthenticatedInterceptor implements HttpInterceptor {
    constructor(@Inject(REQUEST_AUTHENTICATOR) private readonly authenticator: Authenticator) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const nextReq = this.authenticator.authenticate(req);
        return next.handle(nextReq);
    }
}
