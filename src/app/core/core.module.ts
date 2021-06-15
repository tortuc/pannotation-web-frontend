import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { API_URL } from 'src/environments/environment';
import { API_URL_TOKEN } from '../libs/tokens';
import { ApiUrlMatcher } from './api-url-matcher';
import { SessionStorage } from './session/session-storage';
import { RefreshSessionService } from './session/session-refresh';
import { ErrorHandlerModule } from '../libs/error-handler';
import {
    AuthenticatedModule,
    SHOULD_AUTHENTICATE,
    PROVIDE_ACCESS_TOKEN,
    PROVIDE_REFRESH_TOKEN,
    AUTHENTICATED_SESSION_STORAGE,
    SESSION_REFRESHER
} from '../libs/authenticated';
import { LangService } from '../services/lang.service';
import { AvatarService } from '../services/avatar.service';

@NgModule({
    imports: [
        ErrorHandlerModule,
        AuthenticatedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                deps: [HttpClient],
                useFactory: (httpClient: HttpClient) => {
                    return new TranslateHttpLoader(httpClient, '/assets/locale/', '.json');
                }
            }
        })
    ],
    providers: [
        {
            provide: SHOULD_AUTHENTICATE,
            useClass: ApiUrlMatcher
        },
        {
            provide: API_URL_TOKEN,
            useValue: API_URL
        },
        {
            provide: PROVIDE_ACCESS_TOKEN,
            useExisting: SessionStorage
        },
        {
            provide: PROVIDE_REFRESH_TOKEN,
            useExisting: SessionStorage
        },
        {
            provide: AUTHENTICATED_SESSION_STORAGE,
            useExisting: SessionStorage
        },
        {
            provide: SESSION_REFRESHER,
            useExisting: RefreshSessionService
        },
        SessionStorage,
        RefreshSessionService,
        LangService,
        AvatarService
    ]
})
export class CoreModule {
}
