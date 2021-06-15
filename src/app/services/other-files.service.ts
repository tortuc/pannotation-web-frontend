import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_TOKEN } from '../libs/tokens';
import { ResponseModel } from '../models/response/response';
import { OtherFileModel } from '../models/otherfile/otherfile-model';
import { OtherFile } from '../models/otherfile/otherfile';

@Injectable()
export class OtherFilesService {
    private readonly endpoint = '/otherfiles';

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    getOtherFile(id: number): Observable<OtherFileModel> {
        return this.httpClient.get<ResponseModel<OtherFile>>(`${this.apiEndpoint}/${id}`)
            .pipe(map((data: ResponseModel<OtherFile>) => new OtherFileModel(data.data)));
    }

    getPrivateFile(filePath: string): Observable<Blob> {
        return this.httpClient.get(`${filePath}`, { responseType: 'blob' });
    }
}
