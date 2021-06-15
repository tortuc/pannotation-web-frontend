import { Observable } from 'rxjs';

import { ListResponse } from './list-response';
import { Pagination } from './pagination';

export interface FindList<T, F, P extends Pagination = Pagination> {
    findList(filters: F): Observable<ListResponse<T, P>>;
}
