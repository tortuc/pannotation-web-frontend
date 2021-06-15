import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { OrdersService } from '../../../services/orders.service';
import { CommonFilter, CommonUrlFilter, Table } from '../../../libs/tables';
import { UsersService } from '../../../services/users.service';
import { SongsheetOrderModel } from '../../../models/songsheet/songsheet-order-model';

@Component({
    selector: 'app-profile-orders',
    templateUrl: './profile-orders.component.html',
    styleUrls: ['./profile-orders.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileOrdersComponent implements OnInit {
    private readonly subscription = new Subscription();

    orders: Observable<SongsheetOrderModel[]>;
    ordersTable: Table<SongsheetOrderModel, CommonFilter>;
    urlFilter: CommonUrlFilter<CommonFilter>;
    filterChanges: Observable<CommonFilter>;

    limit = 10;
    offset = 0;
    currentOffset = 0;
    pageIndex: number;

    constructor(private readonly ordersService: OrdersService,
                private readonly usersService: UsersService,
                private readonly httpClient: HttpClient,
                @Inject(DOCUMENT) private readonly document: Document,
                private readonly activatedRoute: ActivatedRoute,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.filterChanges = this.activatedRoute
            .queryParamMap
            .pipe(
                map((paramMap) => {
                    const offset = paramMap.has('offset') ? parseInt(paramMap.get('offset'), 10) : this.offset;
                    const limit = paramMap.has('limit') ? parseInt(paramMap.get('limit'), 10) : this.limit;
                    this.pageIndex = offset / limit + 1;
                    this.currentOffset = offset;

                    return {
                        offset,
                        limit
                    } as CommonFilter;
                }),
                shareReplay()
            );

        this.urlFilter = new CommonUrlFilter<CommonFilter>(this.router);

        this.ordersTable = new Table(this.ordersService, this.filterChanges);

        this.orders = this.ordersTable.connect();
    }

    onSaveClick(filePath: string) {
        return this.httpClient.get(`${filePath}`, {responseType: 'blob'})
            .subscribe((data: Blob) => {
                saveAs(data, filePath.split('/').pop());
            });
    }
}
