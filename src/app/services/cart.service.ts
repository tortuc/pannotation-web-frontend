import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, mergeMap, shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { CartModel } from '../models/cart/cart-model';
import { API_URL_TOKEN } from '../libs/tokens';
import { ResponseModel } from '../models/response/response';
import { Cart } from '../models/cart/cart';
import { CartItemModel } from '../models/cart/cart-item-model';
import { CartItem } from '../models/cart/cart-item';
import { CartPaymentModel } from '../models/cart/cart-payment-model';

@Injectable()
export class CartService {
    private readonly endpoint = '/cart';

    private readonly refresher: Subject<void> = new Subject<void>();
    private readonly cartStorage: BehaviorSubject<CartModel> = new BehaviorSubject(undefined);

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient) {
    }

    get cart(): Observable<CartModel> {
        return this.cartStorage.asObservable().pipe(shareReplay());
    }

    initCart(): Observable<CartModel> {
        return this.refresher
            .pipe(
                mergeMap(() => this.requestCart()
                    .pipe(catchError(() => of(undefined)))),
                tap((data: CartModel) => this.cartStorage.next(data))
            );
    }

    refresh(): void {
        this.refresher.next();
    }

    requestCart(): Observable<CartModel> {
        return this.httpClient
            .get<ResponseModel<Cart>>(this.apiEndpoint)
            .pipe(
                map((cart: ResponseModel<Cart>) => new CartModel(cart.data))
            );
    }

    addToCart(songsheetId: number): Observable<CartItemModel> {
        return this.httpClient
            .post<ResponseModel<CartItem>>(this.apiEndpoint, { songsheetId })
            .pipe(map((data: ResponseModel<CartItem>) => new CartItemModel(data.data)));
    }

    deleteFromCart(id: number): Observable<Object> {
        const params = new HttpParams().set('songsheetId', id.toString());

        return this.httpClient
            .delete(this.apiEndpoint, { params });
    }

    clearCart(): void {
        this.cartStorage.next(undefined);
    }

    payFreeCart(): Observable<CartPaymentModel> {
        return this.httpClient
            .post<ResponseModel<CartPaymentModel>>(`${this.apiEndpoint}/free`, {})
            .pipe(map((data: ResponseModel<CartPaymentModel>) => new CartPaymentModel(data.data)));
    }
}
