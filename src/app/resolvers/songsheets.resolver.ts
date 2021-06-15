import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { SongsheetsService } from '../services/songsheets.service';
import { DEFAULT_FILTERS } from '../app.constants';
import { SearchFilter } from '../libs/tables/search-filter';
import { SongsheetsResponse } from '../models/songsheet/songsheet-response-list';

@Injectable()
export class SongsheetsResolver implements Resolve<SongsheetsResponse> {
    constructor(private songsheetsService: SongsheetsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SongsheetsResponse> {
        const filtersDefault: SearchFilter = DEFAULT_FILTERS;
        const { search, sortBy, direction, genres, fileTypes } = route.queryParams;
        if (search) {
            filtersDefault.search = search;
        }
        if (sortBy || direction) {
            filtersDefault.order = {};
        }
        if (direction) {
            filtersDefault.order.direction = <'Asc' | 'Desc'>direction;
        }
        if (sortBy) {
            filtersDefault.order.key = sortBy;
        }
        if (genres) {
            filtersDefault.genres = JSON.parse(genres);
        }
        if (fileTypes) {
            filtersDefault.fileTypes = JSON.parse(fileTypes);
        }

        return this.songsheetsService.findList(filtersDefault);
    }
}
