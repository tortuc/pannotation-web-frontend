import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { GenresService } from '../services/genres.service';
import { SongsheetPropertyModel } from '../models/songsheet-property/songsheet-property-model';

@Injectable()
export class GenresResolver implements Resolve<Array<SongsheetPropertyModel>> {
    constructor(private genresService: GenresService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<SongsheetPropertyModel>> {
        return this.genresService.getGenres();
    }
}
