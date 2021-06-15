import { CommonFilter } from './common-filter';

export interface SearchFilter extends CommonFilter {
    genres?: number[];
    fileTypes?: string[];
}
