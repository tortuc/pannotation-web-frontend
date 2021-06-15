import { Pipe, PipeTransform } from '@angular/core';

import { SearchItemsCount } from '../models/songsheet/songsheet-response-list';
import { OtherFilesTypes } from '../core/enums/other-files-types';

@Pipe({
    name: 'searchResultsTypes'
})
export class SearchResultsTypesPipe implements PipeTransform {

    transform(value: SearchItemsCount[]): any {
        const typesString = value
            .filter((s: SearchItemsCount) => s.count > 0)
            .map((s: SearchItemsCount) => `${s.count} ${OtherFilesTypes[s.type]}${s.count > 1 ? 's' : ''}, `)
            .join('');
        return typesString.substring(0, typesString.length - 2);
    }

}
