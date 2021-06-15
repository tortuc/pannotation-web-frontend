import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ResponseErrorInterceptor } from './response-error.interceptor';
import { ApiHealthInterceptor } from './api-health.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiHealthInterceptor,
            multi: true
        }
    ]
})
export class ErrorHandlerModule {
}
