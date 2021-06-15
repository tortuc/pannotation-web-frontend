import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CommonInfoService } from '../services/common-info.service';
import { Country } from '../models/country/country';

@Injectable()
export class CommonInfoResolver implements Resolve<Country[]> {
    constructor(private commonInfoService: CommonInfoService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country[]> {
        return this.commonInfoService.getCountries();
    }
}
