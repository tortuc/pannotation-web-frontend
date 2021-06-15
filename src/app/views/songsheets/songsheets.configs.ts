import { FormlyFieldConfig } from '@ngx-formly/core';
import { OtherfilesProperty, SongsheetPropertyModel } from 'src/app/models/songsheet-property/songsheet-property-model';

export function getFiltersForm(
    genres: string[],
    sortBy: string[],
    types: string[],
    chosenGenres: Array<SongsheetPropertyModel>,
    chosenItemTypes: OtherfilesProperty[],
): FormlyFieldConfig[] {
    return [
        {
            key: 'type',
            type: 'dropdown',
            className: 'filter-field filter-field-wide',
            templateOptions: {
                type: 'type',
                label: '',
                required: true,
                hideRequiredMarker: true,
                options: types,
                defaultValue: 'File type',
                multi: 'true',
                chosen: chosenItemTypes
            },
        },
        {
            key: 'genre',
            type: 'dropdown',
            className: 'filter-field',
            templateOptions: {
                type: 'genre',
                label: '',
                required: true,
                hideRequiredMarker: true,
                options: genres.sort(),
                defaultValue: 'Genre',
                multi: 'true',
                chosen: chosenGenres
            },
        },
        {
            key: 'sortBy',
            type: 'dropdown',
            className: 'filter-field',
            templateOptions: {
                type: 'sortBy',
                label: '',
                required: true,
                hideRequiredMarker: true,
                options: sortBy,
                defaultValue: 'Sort by',
                multi: 'false'
            },
        }
    ];
}

export function getModel() {
    return {
        genre: '',
        sortBy: ''
    };
}
