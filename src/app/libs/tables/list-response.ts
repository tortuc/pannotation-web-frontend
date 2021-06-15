import { Pagination } from './pagination';

export interface ListResponse<T, P extends Pagination = Pagination> {
    data: T[];
    pagination: P;
}
