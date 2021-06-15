import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response/response';
import { API_URL_TOKEN } from '../libs/tokens';

@Injectable()
export class WithdrawRequestsService {
    private readonly endpoint = '/withdraw-requests';

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    createRequest(amount): Observable<null> {
        return this.httpClient
            .post<ResponseModel<null>>(this.apiEndpoint, {amount})
            .pipe(map(() => null));
    }
}
