import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderService } from '../../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor (
        private readonly loaderService: LoaderService,
    ) { }

    public intercept (
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.loaderService.start();
        return next.handle(request)
            .pipe(
                finalize(this.loaderService.stop.bind(this.loaderService)),
            );
    }
}
