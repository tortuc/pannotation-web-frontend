import { Router } from '@angular/router';

import { CommonFilter } from './common-filter';
import { UrlFilter } from './url-filter';

export class CommonUrlFilter<T extends CommonFilter> extends UrlFilter<T> {
    constructor(router: Router) {
        super(router);
    }

    setSorting(sort: any): Promise<boolean> {
        // requires `any` because TS cannot resolve that T is CommonFilter in UrlFilter
        const params: any = {
            orderType: sort.direction ? sort.direction : undefined,
            orderBy: sort.direction ? sort.active : undefined
        };
        return this.setAll(params);
    }

    setPage(pageEvent: any): Promise<boolean> {
        // requires `any` time because TS cannot resolve that T is CommonFilter in UrlFilter
        const params: any = {
            limit: pageEvent.itemsPerPage,
            offset: pageEvent.page !== 1 ? (pageEvent.page - 1) * pageEvent.itemsPerPage : 0
        };
        return this.setAll(params);
    }
}
