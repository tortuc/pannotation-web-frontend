import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL_TOKEN } from '../libs/tokens';

@Injectable()
export class VerificationsService {
    private readonly endpoint = '/verifications';

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    verify(token: string, email: string): Observable<null> {
        return this.httpClient
            .put<null>(`${this.apiEndpoint}/email`, { token, email });
    }

    resend(email: string): Observable<null> {
        return this.httpClient
            .post<null>(this.apiEndpoint, { email });
    }

    reset(email: string): Observable<null> {
        return this.httpClient
            .post<null>(`${this.apiEndpoint}/password`, { email });
    }

    restore(email: string, token: string, passwordModel: { password: string, confirmPassword: string }): Observable<null> {
        const { password, confirmPassword } = passwordModel;
        return this.httpClient
            .put<null>(`${this.apiEndpoint}/password`, { email, token, password, confirmPassword });
    }

    verifyToken(email: string, token: string): Observable<null> {
        return this.httpClient
            .post<null>(`${this.apiEndpoint}/token`, { email, token });
    }
}
