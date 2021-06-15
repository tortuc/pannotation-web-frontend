import { HttpRequest } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';

import { PROVIDE_ACCESS_TOKEN, SHOULD_AUTHENTICATE } from './tokens';
import { ProvideAccessToken } from './access-token-provider';
import { ShouldAuthenticate } from './should-authenticate';
import { Authenticator } from './authenticator';

@Injectable()
export class BearerAuthenticator implements Authenticator {
    constructor(@Inject(PROVIDE_ACCESS_TOKEN) private readonly accessTokenProvider: ProvideAccessToken,
                @Inject(SHOULD_AUTHENTICATE) @Optional() private readonly authChecker?: ShouldAuthenticate) {
    }

    authenticate(req: HttpRequest<any>): HttpRequest<any> {
        let useAuthentication = true;

        if (this.authChecker) {
            useAuthentication = this.authChecker.shouldAuthenticate(req);
        }

        if (useAuthentication) {
            const accessToken = this.accessTokenProvider.provideAccessToken();

            if (accessToken) {
                return req.clone({
                    setHeaders: { Authorization: `Bearer ${accessToken}` }
                });
            }
        }

        return req;
    }
}
