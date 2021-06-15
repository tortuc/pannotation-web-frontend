import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SessionRefresher<T> {
    refresh(handler: HttpHandler, token: string): Observable<T>;
}
