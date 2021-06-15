import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticatedInterceptor } from './authenticated.interceptor';
import { REQUEST_AUTHENTICATOR } from './tokens';
import { BearerAuthenticator } from './bearer-authenticator';
import { UnauthorizedInterceptor } from './unauthorized.interceptor';

/**
 * This module provides an interceptor that applies Bearer authentication
 * to every request if access token is provided.
 *
 * For using this interceptor you need to import the module and
 * provide a class that implements ProvideAccessToken interface:
 *
 * ```
 * class AccessTokenProvider implements ProvideAccessToken {
 *   provideAccessToken(): string | undefined {
 *     return 'my-bearer-token';
 *   }
 * }
 *
 * @NgModule({
 *     imports: [AuthenticatedModule],
 *     providers: [
 *         {
 *             provide: PROVIDE_ACCESS_TOKEN,
 *             useClass: AccessTokenProvider
 *         }
 *     ]
 * })
 * class CoreModule {
 * }
 * ```
 *
 * You can also provide a class that defines which requests should use authentication
 * and which requests shouldn't:
 *
 * ```
 * export class ApiUrlMatcher implements ShouldAuthenticate {
 *     // apply authentication to each request which url contains API url
 *     shouldAuthenticate(req: HttpRequest<any>): boolean {
 *         return req.url.indexOf('https://api.myproject.dev.cleveroad.com/api/v1') === 0;
 *     }
 * }
 *
 * // ...
 *     providers: [
 *         {
 *             provide: SHOULD_AUTHENTICATE_TOKEN,
 *             useClass: ApiUrlMatcher
 *         }
 *     ]
 * // ...
 * ```
 */
@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: AuthenticatedInterceptor
        },
        {
            provide: REQUEST_AUTHENTICATOR,
            useClass: BearerAuthenticator
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true
        }
    ]
})
export class AuthenticatedModule {
}
