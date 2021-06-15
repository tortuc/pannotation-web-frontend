import { HttpRequest } from '@angular/common/http';

export interface ShouldAuthenticate {
    shouldAuthenticate(req: HttpRequest<any>): boolean;
}
