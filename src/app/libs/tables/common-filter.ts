import { PaginationFilter } from './pagination-filter';

export interface CommonFilter extends PaginationFilter {
    search?: string;
    order?: {
        key?: string;
        direction?: 'Asc' | 'Desc';
    };
}
