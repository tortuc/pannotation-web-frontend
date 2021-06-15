import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    Renderer2,
    ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { debounceTime, filter, map, shareReplay, take, withLatestFrom } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

import { SessionStorage } from '../../core/session/session-storage';
import { UserModel } from '../../models/user/user-model';
import { AuthService } from '../../services/auth.service';
import { SEARCH_QUERY_LENGTH } from '../../app.constants';
import { CartService } from '../../services/cart.service';
import { CartModel } from '../../models/cart/cart-model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
    @ViewChild('menuBtn', { static: false }) menuBtn: ElementRef;
    @ViewChild('navBar', { static: false }) navBar: ElementRef;

    readonly imgLogo = '/assets/img/im-logo.png';
    readonly searchForm: FormGroup;
    readonly isSearchActive = new BehaviorSubject(false);
    readonly isOpenMenu = new BehaviorSubject(false);
    readonly isLoggedIn: Observable<boolean>;
    readonly currentUser: Observable<UserModel>;
    readonly cart: Observable<CartModel>;
    isMobile: Observable<boolean>;

    private readonly subscription = new Subscription();

    constructor(private readonly breakpointObserver: BreakpointObserver,
                private readonly renderer: Renderer2,
                private readonly elementRef: ElementRef,
                private readonly sessionStorage: SessionStorage,
                private readonly cartService: CartService,
                @Inject(PLATFORM_ID) readonly platformId,
                @Inject(DOCUMENT) readonly document,
                private readonly router: Router,
                private readonly activatedRoute: ActivatedRoute,
                private readonly authService: AuthService) {
        const { search } = this.activatedRoute.snapshot.queryParams;
        this.searchForm = new FormGroup({
            search: new FormControl(search)
        });
        this.isSearchActive.next(!!search && !!search.length);

        this.isLoggedIn = sessionStorage.userChanges
            .pipe(
                map((u) => !!u),
                shareReplay()
            );

        this.currentUser = sessionStorage.userChanges;

        this.cart = this.cartService.cart;
    }

    ngOnInit(): void {
        this.isMobile = this.breakpointObserver.observe('(max-width: 991px)')
            .pipe(
                map((val) => val.matches),
            );

        const isOpenMenuSubscription = this.isOpenMenu
            .pipe(
                withLatestFrom(this.isMobile),
                filter(([/*isOpenMenu*/, isMobile]) => isMobile)
            )
            .subscribe(([isOpenMenu/*, isMobile*/]) => {
                isOpenMenu
                    ? this.renderer.addClass(this.elementRef.nativeElement, 'locked')
                    : this.renderer.removeClass(this.elementRef.nativeElement, 'locked');
                isOpenMenu
                    ? this.renderer.addClass(this.document.body, 'locked')
                    : this.renderer.removeClass(this.document.body, 'locked');
            });
        this.subscription.add(isOpenMenuSubscription);

        const searchSubscription = this.searchForm.get('search').valueChanges
            .pipe(
                debounceTime(500)
            )
            .subscribe((search) => {
                if (search.length === 0) {
                    this.router.navigate(['/music-scores']);
                }
                if (search.length >= SEARCH_QUERY_LENGTH) {
                    this.router.navigate(
                        ['/music-scores'],
                        { queryParams: { search }, queryParamsHandling: 'merge' }
                    );
                }
            });
        this.subscription.add(searchSubscription);

        const navigatiionStart = this.router.events
            .pipe(
                filter((event) => event instanceof NavigationStart && this.isOpenMenu.getValue())
            )
            .subscribe((e: NavigationStart) => this.closeMenu());

        this.subscription.add(navigatiionStart);

        this.subscription.add(this.cartService.initCart().subscribe());

        const userSubscription = this.currentUser
            .subscribe((u: UserModel) => u ?
                this.cartService.refresh() :
                this.cartService.clearCart()
            );

        this.subscription.add(userSubscription);

        window.onorientationchange = () => {
            if (this.isOpenMenu.getValue() === true) {
                this.renderer.removeClass(this.navBar.nativeElement, 'show');
                this.isOpen();
            }
        };
    }

    onSearchClick(event: Event): void {
        event.preventDefault();
        this.isSearchActive.next(!this.isSearchActive.getValue());
    }

    onSearchCancelClick(event: Event): void {
        event.preventDefault();
        this.isSearchActive.next(!this.isSearchActive.getValue());
        this.searchForm.get('search').setValue('', { emitEvent: false });
    }

    isOpen(): void {
        this.isOpenMenu.next(!this.isOpenMenu.getValue());
    }

    closeMenu(): void {
        this.isMobile
            .pipe(
                take(1),
                filter((r) => !!r)
            )
            .subscribe(() => {
                this.renderer.removeClass(this.navBar.nativeElement, 'show');
                this.isOpenMenu.next(false);
            });
    }

    onNavClicked(event: string): void {
        if (event === 'logout') {
            this.authService.logout().subscribe(() => {
                this.sessionStorage.destroy();
                this.router.navigate(['/']);
            });
        } else {
            throw new Error('Unknown action');
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    cartDropdownChange() {
        // TODO There is a bug when set triggers to hover, it doesn't rerender menu when data loaded without this method
    }
}
