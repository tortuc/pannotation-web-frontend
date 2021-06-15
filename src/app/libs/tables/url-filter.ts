import { Router } from '@angular/router';
import { CommonFilter } from './common-filter';

export class UrlFilter<T extends CommonFilter> {
    constructor(private readonly router: Router) {
    }

    setKey<K extends keyof T>(key: K, value: T[K]): Promise<boolean> {
        const minSearchLength = 1;
        let params: any;
        if ((typeof value === 'string' && value === '') || value === undefined) {
            params = {
                page: 1,
                [key]: undefined
            };
        } else if (typeof value === 'string' && value.length >= minSearchLength) {
            params = {
                [key]: value,
                page: 1
            };
        }

        if (params) {
            return this.setAll(params);
        } else {
            return Promise.resolve(true);
        }
    }

    setKeys(values: Partial<T>, merge = true): Promise<boolean> {
        const minSearchLength = 1;
        const params = Object.keys(values).reduce((result, key) => {
            if ((typeof values[key] === 'string' && values[key] === '') || values[key] === undefined) {
                result[key] = undefined;
            } else if (typeof values[key] === 'string' && values[key].length >= minSearchLength) {
                result[key] = values[key];
            } else if (Array.isArray(values[key]) && values[key].length) {
                result[key] = values[key];
            }

            return result;
        }, {});

        return this.setAll(params, merge);
    }

    setAll(queryParams: { [K in keyof T]?: T[K] }, merge = true): Promise<boolean> {
        const queryParamsHandling = merge ? 'merge' : null;
        return this.router.navigate([], {
            queryParams, queryParamsHandling
        });
    }
}
