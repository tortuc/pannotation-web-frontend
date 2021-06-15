import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SongsheetModel } from '../models/songsheet/songsheet-model';
import { SongsheetsService } from '../services/songsheets.service';
import { ListResponse } from '../libs/tables';

@Injectable()
export class SongsheetTopResolver implements Resolve<ListResponse<SongsheetModel>> {
    constructor(private songsheetsService: SongsheetsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListResponse<SongsheetModel>> {
        return this.songsheetsService.topList()
            .pipe(
                map((data: ListResponse<SongsheetModel>) => data)
            );
    }
}
