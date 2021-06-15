import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Country } from '../models/country/country';

@Injectable()
export class CommonInfoService {
    private readonly countriesEndpoint = 'https://restcountries.eu/rest/v2/all';

    constructor(private readonly httpClient: HttpClient) {
    }

    getCountries (): Observable<Country[]> {
        return this.httpClient
            .get<Country[]>(`${this.countriesEndpoint}`)
            .pipe(
                map((data) => data.map(({ name, numericCode, alpha2Code}) => ({ name, numericCode, alpha2Code})))
            );
    }
}
