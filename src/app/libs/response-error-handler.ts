import { HttpErrorResponse } from '@angular/common/http';

import { ErrorItem } from '../models/response/server-error';

export function responseErrorHandler(err: HttpErrorResponse): string {
    const error: ErrorItem = (err.error && err.error.errors) ? err.error.errors[0] : null;
    return (error) ? error.message : 'Unknown error';
}
