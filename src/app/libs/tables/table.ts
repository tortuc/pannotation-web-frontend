import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';

import { FindList } from './find-list';
import { Pagination } from './pagination';

export class Table<T, F, P extends Pagination = Pagination> extends DataSource<T> {
    private readonly refresher = new Subject<void>();
    private readonly pending = new BehaviorSubject<boolean>(false);
    private readonly length = new BehaviorSubject<number>(0);
    private readonly pagination = new Subject<P>();
    private currentFilter: F;

    constructor(private dataService: FindList<T, F, P>, private readonly filterChanges: Observable<F>) {
        super();
    }

    get isPending(): Observable<boolean> {
        return Table.itemChanges(this.pending);
    }

    get lengthChanges(): Observable<number> {
        return Table.itemChanges(this.length);
    }

    get metaChanges(): Observable<P> {
        return Table.itemChanges(this.pagination);
    }

    private static itemChanges<S>(subject: Subject<S>): Observable<S> {
        return subject.asObservable()
            .pipe(
                distinctUntilChanged()
            );
    }

    connect(collectionViewer?: CollectionViewer): Observable<T[]> {
        const stopPending = () => this.pending.next(false);
        const filterChanges = this.filterChanges.pipe(
            // store current filter
            tap((f) => this.currentFilter = f)
        );
        const refreshEmitted = this.refresher.pipe(
            // emit last value of filter
            map(() => this.currentFilter)
        );
        return merge(filterChanges, refreshEmitted)
            .pipe(
                tap(() => this.pending.next(true)),
                switchMap((filters) => this.dataService.findList(filters)),
                tap(stopPending, stopPending),
                finalize(stopPending),
                tap((res) => {
                    this.length.next(res.pagination.totalCount);
                    this.pagination.next(res.pagination);
                }),
                map(({ data }) => data),
                startWith([])
            );
    }

    disconnect(collectionViewer?: CollectionViewer): void {
        /* do nothing */
    }

    refresh(): void {
        this.refresher.next();
    }
}
