import { HttpParams } from '@angular/common/http';

export function createParams(params: HttpParams, objectParams: object): HttpParams {
    if (objectParams) {
        Object.keys(objectParams).forEach((key) => {
            if (Array.isArray(objectParams[key])) {
                objectParams[key].forEach((item, index) => {
                    params = params.append(`${key}`, objectParams[key][index]);
                });
                delete objectParams[key];
            }

            if (objectParams[key]) {
                params = params.append(key, objectParams[key]);
            }
        });
    }
    return params;
}
