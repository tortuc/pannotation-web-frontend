import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, share, switchMap, delay, take, filter } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { SongsheetModel } from '../../models/songsheet/songsheet-model';
import { SongsheetsService } from '../../services/songsheets.service';
import { Pagination } from '../../libs/tables';
import { DEFAULT_FILTERS } from '../../app.constants';
import { getFiltersForm, getModel } from './songsheets.configs';
import { OrderModel } from '../../models/songsheet/order-model';
import { OtherfilesProperty, SongsheetPropertyModel } from '../../models/songsheet-property/songsheet-property-model';
import { SearchFilter } from '../../libs/tables/search-filter';
import { OtherFilesTypes } from '../../core/enums/other-files-types';
import { SearchItemsCount } from '../../models/songsheet/songsheet-response-list';

@Component({
    selector: 'app-songsheets',
    templateUrl: './songsheets.component.html',
    styleUrls: ['./songsheets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongsheetsComponent implements OnInit {
    readonly list = new BehaviorSubject<SongsheetModel[]>([]);
    readonly pagination = new BehaviorSubject<Pagination>(undefined);
    readonly order: Map<string, OrderModel> = new Map([
        ['Latest', {column: 'CreatedAt', order: 'Desc'}],
        ['From A-Z', {column: 'Name', order: 'Asc'}],
        ['From Z-A', {column: 'Name', order: 'Desc'}],
        ['Price: min to max', {column: 'Price', order: 'Asc'}],
        ['Price: max to min', {column: 'Price', order: 'Desc'}],
    ]);
    readonly genres: Array<SongsheetPropertyModel>;
    readonly itemTypes: OtherfilesProperty[] = Object.keys(OtherFilesTypes)
        .map((k: string) => ({
            id: k,
            name: OtherFilesTypes[k]
        }));

    choosenGenres: Array<SongsheetPropertyModel> = [];
    chosenItemTypes: OtherfilesProperty[] = [];
    filtersForm: FormGroup;
    model: { genre: string, sortBy: string };
    filtersFormConfig: FormlyFieldConfig[];
    loadMoreDisabled: Observable<boolean>;
    isLoadingData: BehaviorSubject<boolean> = new BehaviorSubject(true);
    readonly searchedTypesResult: BehaviorSubject<SearchItemsCount[]> = new BehaviorSubject<SearchItemsCount[]>([]);

    private readonly subscription = new Subscription();
    filter = new BehaviorSubject<SearchFilter>(DEFAULT_FILTERS);

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly router: Router,
                private readonly songsheetsService: SongsheetsService) {
        const {genres} = activatedRoute.snapshot.data;
        this.genres = genres;

        const {songsheets} = this.activatedRoute.snapshot.data;
        if (songsheets) {
            // first chunk of data was loaded via resolver with default filter parameters
            // so filter by default with DEFAULT_FILTERS
            this.list.next(songsheets.items);
            this.isLoadingData.next(false);
            this.pagination.next(songsheets.pagination);
            this.searchedTypesResult.next(songsheets.itemsCount);
        }

        this.initForm();

        this.loadMoreDisabled = combineLatest([this.list, this.pagination])
            .pipe(
                // tslint:disable-next-line
                map(([songsheets, pagination]) => songsheets.length >= (pagination as Pagination).totalCount),
                share()
            );
    }

    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(
                delay(100),
                take(1),
                filter(({params}: any) => !!params.fileTypes && !params.fileTypes.includes('Songsheet')),
                map(() => this.filtersForm.get('genre'))
            )
            .subscribe((c: FormControl) => c.disable());

        this.activatedRoute.queryParamMap
            .subscribe((paramMap) => {
                this.updateFilter(paramMap);
            });

        this.filtersForm.valueChanges
            .pipe(
                delay(100),
                switchMap((control: FormGroup) => this.filtersForm.controls.genre.valueChanges)
            )
            .subscribe((genre) => {
                if (genre) {
                    const item = this.genres.find(x => x.name === genre);
                    if (item) {
                        // In case if element alread exists - remove it from filter
                        if (this.choosenGenres.find(x => x === item)) {
                            const index: number = this.choosenGenres.indexOf(item);
                            if (index !== -1) {
                                this.choosenGenres.splice(index, 1);
                            }

                            // If there is no genres - remove it from url string
                            if (this.choosenGenres.length < 1) {
                                this.updateQueryParams({'genres': null});
                            } else {
                                this.updateQueryParams({'genres': JSON.stringify(this.choosenGenres.map(x => x.id))});
                            }
                        } else {
                            this.choosenGenres.push(item);
                            this.updateQueryParams({'genres': JSON.stringify(this.choosenGenres.map(x => x.id))});
                        }
                    }
                }
            });

        this.filtersForm.valueChanges
            .pipe(
                delay(100),
                switchMap(() => this.filtersForm.get('type').valueChanges)
            )
            .subscribe((type: string) => {
                if (type) {
                    const item = this.itemTypes.find(t => t.name === type);

                    if (item) {
                        if (this.chosenItemTypes.find(x => x === item)) {
                            const index: number = this.chosenItemTypes.indexOf(item);
                            if (index !== -1) {
                                this.chosenItemTypes.splice(index, 1);
                            }
                        } else {
                            this.chosenItemTypes.push(item);
                            this.updateQueryParams({'fileTypes': JSON.stringify(this.chosenItemTypes.map(x => x.id))});
                        }
                    }

                    this.filtersForm.get('genre').setValue(null);

                    if (this.chosenItemTypes.length < 1) {
                        const queryParams = {...this.activatedRoute.snapshot.queryParams, 'fileTypes': null};
                        this.updateQueryParams(queryParams);
                        this.filtersForm.get('genre').enable();
                    } else {
                        const queryParams: any = {
                            ...this.activatedRoute.snapshot.queryParams,
                            'fileTypes': JSON.stringify(this.chosenItemTypes.map(x => x.id)),
                        };

                        if (!this.chosenItemTypes.find(v => v.id === 'Songsheet')) {
                            queryParams.genres = null;
                            this.filtersForm.get('genre').disable();
                            this.choosenGenres.splice(0);
                        } else  {
                            this.filtersForm.get('genre').enable();
                        }

                        this.updateQueryParams(queryParams);
                    }
                }
            });

        this.filtersForm.valueChanges
            .pipe(
                delay(100),
                switchMap((control: FormGroup) => this.filtersForm.controls.sortBy.valueChanges)
            )
            .subscribe((sortBy) => {
                if (sortBy) {
                    const filterOrder: OrderModel = this.order.get(sortBy);
                    const direction = <'Asc' | 'Desc'>filterOrder.order;
                    const key = filterOrder.column;
                    this.updateQueryParams({'sortBy': key, direction});
                }
            });
    }

    handleLoadMore(): void {
        const nextOffset = this.pagination.getValue().nextOffset;
        if (!nextOffset) {
            return;
        }

        const paramMap = this.activatedRoute.snapshot.queryParamMap;
        const search = paramMap.get('search') ? paramMap.get('search') : '';
        const direction = paramMap.get('direction') ? paramMap.get('direction') : '';
        const sortBy = paramMap.get('sortBy') ? paramMap.get('sortBy') : '';
        const filters = {...this.filter.getValue(), ...DEFAULT_FILTERS};
        filters.offset += nextOffset;

        filters.search = search;

        if (sortBy || direction) {
            filters.order = {};
        }

        if (direction) {
            filters.order.direction = <'Asc' | 'Desc'>direction;
        }

        if (sortBy) {
            filters.order.key = sortBy;
        }

        filters.genres = this.choosenGenres.map(x => x.id);
        filters.fileTypes = this.chosenItemTypes.map(x => x.id);

        this.loadData(filters);
    }

    private updateFilter(paramMap: ParamMap): void {
        const search = paramMap.get('search') ? paramMap.get('search') : '';
        const direction = paramMap.get('direction') ? paramMap.get('direction') : '';
        const sortBy = paramMap.get('sortBy') ? paramMap.get('sortBy') : '';
        const filters = {...this.filter.getValue(), ...DEFAULT_FILTERS};

        if (filters.search !== search) {
            filters.offset = 0;
        }

        filters.search = search;

        if (filters.order) {
            delete filters.order;
        }

        if (filters.genres) {
            delete filters.genres;
        }

        if (sortBy || direction) {
            filters.order = {};
        }

        if (direction) {
            filters.order.direction = <'Asc' | 'Desc'>direction;
        }

        if (sortBy) {
            filters.order.key = sortBy;
        }

        filters.genres = this.choosenGenres.map(x => x.id);
        filters.fileTypes = this.chosenItemTypes.map(x => x.id);

        this.list.next([]);
        this.loadData(filters);
    }

    private updateQueryParams(queryParams: Params): Promise<boolean> {
        return this.router.navigate(
            ['/music-scores'],
            {queryParams, queryParamsHandling: 'merge'}
        );
    }

    private loadData(filters: SearchFilter): void {
        this.filter.next({...filters});
        this.isLoadingData.next(true);
        this.songsheetsService.findList(filters)
            .subscribe(
                ({items, pagination, itemsCount}) => {
                this.list.next([...this.list.getValue(), ...items]);
                this.isLoadingData.next(false);
                this.searchedTypesResult.next(itemsCount);
                this.pagination.next(pagination);
                },
                () => this.isLoadingData.next(false));
    }

    private getGenres(genres: string): void {
        const urlGenres: string[] = JSON.parse(genres);
        this.choosenGenres = [];
        urlGenres.forEach(x => this.choosenGenres.push(this.genres.find(y => y.id === parseInt(x, 10))));
    }

    private getFileTypes(types: string): void {
        const urlFileTypes: string[] = JSON.parse(types);
        this.chosenItemTypes = [];
        urlFileTypes.forEach(x => this.chosenItemTypes.push(this.itemTypes.find(y => y.id === x)));
        if (urlFileTypes.length > 0 && !urlFileTypes.includes('Songsheet')) {
            this.choosenGenres = [];
        }
    }

    private initForm(): void {
        this.filtersForm = new FormGroup({});
        this.model = getModel();

        const paramMap = this.activatedRoute.snapshot.queryParamMap;
        const genres = paramMap.get('genres') ? paramMap.get('genres') : '';
        const fileTypes = paramMap.get('fileTypes') ? paramMap.get('fileTypes') : '';
        if (genres) {
            this.getGenres(genres);
        }

        if (fileTypes) {
            this.getFileTypes(fileTypes);
        }

        this.filtersFormConfig = getFiltersForm(
            [...this.genres.map(x => x.name)],
            [...this.order.keys()],
            this.itemTypes.map((i) => i.name),
            this.choosenGenres,
            this.chosenItemTypes);
    }
}
