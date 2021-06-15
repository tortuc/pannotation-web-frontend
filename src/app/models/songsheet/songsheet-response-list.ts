import { Pagination } from '../../libs/tables';
import { SongsheetModel } from './songsheet-model';

export interface SearchItemsCount {
    type: string;
    count: number;
}

export interface SongsheetsResponseList<T, P extends Pagination = Pagination> {
    data: {
        searchString: string;
        itemsCount: SearchItemsCount[]
        items: T[]
    };
    pagination: P;
}

export interface SongsheetsResponse {
    itemsCount?: SearchItemsCount[];
    items: SongsheetModel[];
    pagination: Pagination;
}
