import { HttpRequest } from '@angular/common/http';

export interface Authenticator {
    authenticate(req: HttpRequest<any>): HttpRequest<any>;
}
