import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { API_URL_TOKEN } from '../libs/tokens';
import { ResponseMessage, ResponseModel } from '../models/response/response';
import { PaymentPayload } from '../models/payments/payment-payload';

@Injectable()
export class PaymentsService {
    private readonly endpoint = '/payments';

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly sanitizer: DomSanitizer,
                private readonly httpClient: HttpClient) {
    }

    paySubscription(payload: PaymentPayload): Observable<Object> {
        return this.httpClient
            .post(`${this.apiEndpoint}/subscribe`, payload);
    }

    payCart(payload: PaymentPayload): Observable<SafeUrl> {
        const url: string = [this.apiUrl, 'cart', 'payment'].join('/');

        return this.httpClient
            .post<ResponseModel<ResponseMessage>>(url, payload)
            .pipe(
                map((data: ResponseModel<ResponseMessage>) => data.data.message),
                map((html: string) => this.sanitizer.bypassSecurityTrustHtml(html))
            );
    }
}
