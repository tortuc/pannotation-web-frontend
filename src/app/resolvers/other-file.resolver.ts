import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { OtherFileModel } from '../models/otherfile/otherfile-model';
import { OtherFilesService } from '../services/other-files.service';

@Injectable()
export class OtherFileResolver implements Resolve<OtherFileModel> {
    constructor(private ofService: OtherFilesService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OtherFileModel> {
        const otherFileId = route.params.id;

        return this.ofService.getOtherFile(otherFileId).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 404) {
                    this.router.navigate(['/404']);
                    return throwError(err);
                }
            })
        );
    }
}
