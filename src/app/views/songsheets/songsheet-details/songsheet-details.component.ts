import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, take, tap } from 'rxjs/operators';
import { iif, Observable, of } from 'rxjs';

import { SongsheetModel } from '../../../models/songsheet/songsheet-model';
import { SessionStorage } from '../../../core/session/session-storage';
import { CartService } from '../../../services/cart.service';
import { UserModel } from '../../../models/user/user-model';

@Component({
    selector: 'app-songsheet-details',
    templateUrl: './songsheet-details.component.html',
    styleUrls: ['./songsheet-details.component.scss']
})
export class SongsheetDetailsComponent implements OnInit {
    songsheet: SongsheetModel;
    user: Observable<UserModel>;

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly cartService: CartService,
                private readonly router: Router,
                private readonly sessionStorage: SessionStorage) {
        this.user = this.sessionStorage.userChanges;
    }

    ngOnInit() {
        this.initOrder();
    }

    initOrder(): void {
        this.songsheet = this.activatedRoute.snapshot.data.songsheet;
    }

    get instruments(): string {
        if (!this.songsheet ||
            !this.songsheet.instruments ||
            !this.songsheet.instruments.length ||
            !this.songsheet.genres ||
            !this.songsheet.genres.length) {
            return '';
        }

        const contentToShow: string[] = this.songsheet.genres.concat(this.songsheet.instruments);

        const contentToShowLength = contentToShow.length;
        return (contentToShowLength <= 4
            ? contentToShow
            : contentToShow.slice(0, 4).concat('AND MORE')).join(' · ').toUpperCase();
    }

    onAddToCart(id: number) {
        this.sessionStorage.userChanges
            .pipe(
                take(1),
                mergeMap((u) => (
                    iif(() => !!u,
                        this.cartService.addToCart(id).pipe(tap(() => this.cartService.refresh())),
                        of(null).pipe(tap(() => this.router.navigate(['/sign-in'], {queryParams: { songsheet: id}})))
                    )
                )
            ))
            .subscribe();
    }
}
