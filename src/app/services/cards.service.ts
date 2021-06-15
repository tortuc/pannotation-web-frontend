import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_TOKEN } from '../libs/tokens';
import { ResponseModel } from '../models/response/response';
import { Card } from '../models/card/card';
import { CardModel } from '../models/card/card-model';

@Injectable()
export class CardsService {
    private readonly endpoint = '/cards';

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    addCard (card: Card): Observable<Card> {
        return this.httpClient
            .post<ResponseModel<CardModel>>(this.apiEndpoint, card)
            .pipe(map((response: ResponseModel<CardModel>) => new CardModel(response.data)));
    }

    getCard (): Observable<Card[]> {
        return this.httpClient
            .get<ResponseModel<CardModel[]>>(`${this.apiEndpoint}/me`)
            .pipe(map((response: ResponseModel<CardModel[]>) => response.data.map(card => new CardModel(card))));
    }
}
