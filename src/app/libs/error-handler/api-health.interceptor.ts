import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from 'src/app/services/notification.service';

@Injectable()
export class ApiHealthInterceptor implements HttpInterceptor {
    constructor(private readonly notificationsService: NotificationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 0) {
                    this.notificationsService.open('No internet connection', 'error');
                    return EMPTY;
                }

                return throwError(error);
            })
        );
    }
}
