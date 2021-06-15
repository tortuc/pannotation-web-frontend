import { Injectable, Inject } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

import { ShouldAuthenticate } from '../libs/authenticated';
import { API_URL_TOKEN } from '../libs/tokens';

@Injectable()
export class ApiUrlMatcher implements ShouldAuthenticate {
    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string) {
    }

    // use authentication for every local API
    private isInnerRequest(url: string): boolean {
        return url.indexOf(this.apiUrl) === 0;
    }

    shouldAuthenticate(req: HttpRequest<any>): boolean {
        return this.isInnerRequest(req.url);
    }
}
