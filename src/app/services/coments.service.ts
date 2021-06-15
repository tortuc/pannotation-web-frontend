import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ListResponse, Pagination } from '../libs/tables';
import { API_URL_TOKEN } from '../libs/tokens';
import { Comment } from '../models/comment/comment';
import { ResponseModel } from '../models/response/response';
import { CommentModel } from '../models/comment/comment-model';

@Injectable()
export class CommentsService {
    private readonly endpoint = '/comments';

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    getList (filter: any): Observable<ListResponse<Comment, Pagination>> {
        let params = new HttpParams();
        Object.keys(filter).forEach((key) => {
            if (filter[key]) {
                params = params.append(key, filter[key]);
            }
        });

        return this.httpClient
            .get<ListResponse<Comment, Pagination>>(this.apiEndpoint, { params })
            .pipe(
                map((data: ListResponse<Comment, Pagination>) => {
                    return {
                        data: data.data,
                        pagination: data.pagination,
                    };
                }),
                // ignore error
                catchError(() => of({ data: [], pagination: {  totalCount: 0 }})),
            );
    }

    addComment (productId: number, rate: number, comment): Observable<CommentModel> {
        return this.httpClient
            .post<ResponseModel<CommentModel>>(this.apiEndpoint, Object.assign(comment, { productId, rate }))
            .pipe(map((response: ResponseModel<CommentModel>) => new CommentModel(response.data)));
    }
}
