import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { API_URL_TOKEN } from '../libs/tokens';
import { ResponseModel } from '../models/response/response';
import { ContactUsFormModel } from '../views/contact-us/contact-us.model';

interface ContactResponse {
    readonly message: string;
}

@Injectable()
export class SystemService {
    private readonly endpoint = '/system/contact-us';

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    postContactForm(payload: ContactUsFormModel): Observable<string> {
        return this.httpClient
            .post<ResponseModel<ContactResponse>>(this.apiEndpoint, payload)
            .pipe(map((data: ResponseModel<ContactResponse>) => data.data.message));
    }
}
