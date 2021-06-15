import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { SongsheetModel } from '../models/songsheet/songsheet-model';
import { SongsheetsService } from '../services/songsheets.service';

@Injectable()
export class SongsheetResolver implements Resolve<SongsheetModel> {
    constructor(private songsheetsService: SongsheetsService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SongsheetModel> {
        const songsheetId = route.params.id;

        return this.songsheetsService.getSongsheet(songsheetId).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 404) {
                    this.router.navigate(['/404']);
                    return throwError(err);
                }
            })
        );
    }
}
