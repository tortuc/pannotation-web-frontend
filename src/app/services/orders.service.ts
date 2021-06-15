import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SongsheetOrderModel } from '../models/songsheet/songsheet-order-model';
import { SongsheetOrder } from '../models/songsheet/songsheet-order';
import { API_URL_TOKEN } from '../libs/tokens';
import { CommonFilter, ListResponse, Pagination } from '../libs/tables';
import { createParams } from '../core/helpers/http-params-helper';
import { CartPaymentModel } from '../models/cart/cart-payment-model';
import { ResponseModel } from '../models/response/response';

@Injectable()
export class OrdersService {
    private readonly endpoint = '/orders/songsheets';

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    findList(filter: CommonFilter): Observable<ListResponse<SongsheetOrderModel, Pagination>> {
        let params = new HttpParams();

        params = createParams(params, filter);

        return this.httpClient
            .get<ListResponse<SongsheetOrder, Pagination>>(this.apiEndpoint, { params })
            .pipe(
                map(({ data, pagination }: ListResponse<SongsheetOrder, Pagination>) => {
                    return {
                        pagination: pagination,
                        data: data.map((i) => new SongsheetOrderModel(i)),
                    };
                }),
                // ignore error
                catchError(() => of({ data: [], pagination: { totalCount: 0 } })),
            );
    }

    downloadOrderSongsheets(id: number): Observable<Object> {
        const url = [this.apiUrl, 'orders', id, 'songsheets', 'download'].join('/');

        return this.httpClient
            .get(url, {responseType: 'blob'});
    }

    getOrderById(id: number): Observable<CartPaymentModel> {
        const url = [this.apiUrl, 'orders', id].join('/');

        return this.httpClient
            .get(url)
            .pipe(
                map((data: ResponseModel<CartPaymentModel>) => new CartPaymentModel(data.data))
            );
    }
}
