import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_TOKEN } from '../libs/tokens';
import { SongsheetPropertyModel } from '../models/songsheet-property/songsheet-property-model';

@Injectable()
export class GenresService {
    private readonly endpoint = '/songsheets';

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string, private readonly httpClient: HttpClient) {
    }

    private get apiEndpoint(): string {
        return [this.apiUrl, this.endpoint].join('');
    }

    getGenres(): Observable<Array<SongsheetPropertyModel>> {
        return this.httpClient
            .get<Response>(this.apiEndpoint + '/genres', { responseType: 'json' })
            .pipe(
                map((data: any) => {
                    const keys = Object.keys(data.data);

                    const genres = Array<SongsheetPropertyModel>();

                    keys.forEach((key) => genres.push({ id: parseInt(key, 10), name: data.data[key] }));

                    return genres;
                })
            );
    }
}
