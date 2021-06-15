import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SongsheetModel } from '../models/songsheet/songsheet-model';
import { ResponseModel } from '../models/response/response';
import { ListResponse, Pagination } from '../libs/tables';
import { API_URL_TOKEN } from '../libs/tokens';
import { Songsheet } from '../models/songsheet/songsheet';
import { SearchFilter } from '../libs/tables/search-filter';

import { FeaturedFilter } from '../views/home/home.component';
import { createParams } from '../core/helpers/http-params-helper';
import { SongsheetsResponse, SongsheetsResponseList } from '../models/songsheet/songsheet-response-list';

@Injectable()
export class SongsheetsService {
    private readonly endpoint = '/songsheets';

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
        private readonly httpClient: HttpClient) {
    }

    private get apiEndpoint(): string {
        return [this.apiUrl, this.endpoint].join('');
    }

    topList(filters?: FeaturedFilter): Observable<ListResponse<SongsheetModel, Pagination>> {
        let params = new HttpParams();

        if (filters) {
            params = createParams(params, filters);
        }

        return this.httpClient
            .get<ListResponse<Songsheet, Pagination>>(this.apiEndpoint + '/top', { params })
            .pipe(
                map(({ data, pagination }: ListResponse<Songsheet, Pagination>) => {
                    return {
                        data: data.map((s) => new SongsheetModel(s)),
                        pagination
                    };
                }),
                // ignore error
                catchError(() => of({ data: [], pagination: { totalCount: 0 } })),
            );
    }

    findList(filter: SearchFilter): Observable<SongsheetsResponse> {
        let params = new HttpParams();
        Object.keys(filter).forEach((key) => {
            if (Array.isArray(filter[key])) {
                filter[key].forEach((item, index) => {
                    params = params.append(`${key}[${index}]`, filter[key][index]);
                });
                delete filter[key];
            } else if (key === 'order') {
                Object.keys(filter[key]).forEach((item) => {
                    params = params.append(`${key}.${item}`, filter[key][item]);
                });
                delete filter[key];
            } else if (key === 'search') {
                params = params.append(key, encodeURIComponent(filter[key]));
                delete filter[key];
            }

            if (filter[key]) {
                params = params.append(key, filter[key]);
            }
        });

        return this.httpClient
            .get<SongsheetsResponseList<Songsheet, Pagination>>(`${this.apiEndpoint}/search`, { params })
            .pipe(
                map(({ data, pagination }: SongsheetsResponseList<Songsheet, Pagination>) => {
                    return {
                        pagination,
                        items: data.items.map((i) => new SongsheetModel(i)),
                        itemsCount: data.itemsCount
                    };
                }),
                // ignore error
                catchError(() => of({ items: [], pagination: { totalCount: 0 } })),
            );
    }

    getSongsheet(songsheetId: number): Observable<SongsheetModel> {
        return this.httpClient
            .get<ResponseModel<SongsheetModel>>(`${this.apiEndpoint}/${songsheetId}`)
            .pipe(map((response: ResponseModel<SongsheetModel>) => new SongsheetModel(response.data)));
    }
}
