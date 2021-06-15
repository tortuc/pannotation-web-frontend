import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageResponseModel } from '../models/image';
import { ImageRequest } from '../models/image';
import { API_URL_TOKEN } from '../libs/tokens';
import { ImageType } from '../models/image/image-type';
import { ResponseModel } from '../models/response/response';

@Injectable()
export class ImagesService {
    private readonly endpoint = '/upload';

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    uploadImage(body: FormData, type: ImageType): Observable<ResponseModel<ImageResponseModel>> {
        return this.httpClient
            .post(`${this.apiEndpoint}/image?imageType=` + type, body)
            .pipe(map((response: ResponseModel<ImageResponseModel>) => response));
    }

    updateStatus(id: number, status: number): Observable<null> {
        return this.httpClient
            .patch<null>(`${this.apiEndpoint}/${id}`, { status });
    }

    uploadToS3(data: ImageRequest, file: Blob): Observable<null> {
        const formData = new FormData();
        Object.keys(data.meta.formData).forEach((key) => {
            formData.append(key, data.meta.formData[key].toString());
        });
        formData.append('file', file);
        return this.httpClient
            .post<null>(data.meta.url, formData);
    }
}
