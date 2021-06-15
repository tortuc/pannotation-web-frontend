import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { delay, filter, switchMap, take, tap } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
import { SafeUrl } from '@angular/platform-browser';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { DOCUMENT } from '@angular/common';
import { saveAs } from 'file-saver';

import { BillingAddressModel, CheckoutPaymentModel } from './checkout.model';
import { getBillingConfig, getBillingModel, getPaymentConfig, getPaymentModel } from './checkout.config';
import { CheckoutPage } from '../../core/enums/checkout-page.enum';
import { CartService } from '../../services/cart.service';
import { CartModel } from '../../models/cart/cart-model';
import { ThanksPurchasingData } from '../../core/types/thanks-purchasing.type';
import { PaymentsService } from '../../services/payments.service';
import { PaymentPayload } from '../../models/payments/payment-payload';
import { Country } from '../../models/country/country';
import { getCardType } from '../../core/helpers/card-types';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user/user-model';
import { SessionStorage } from '../../core/session/session-storage';
import { OrdersService } from '../../services/orders.service';
import { CartPaymentModel } from '../../models/cart/cart-payment-model';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {
    readonly countriesList: Country[];
    readonly page: CheckoutPage;
    readonly CHECKOUT_PAGE = CheckoutPage;
    readonly cart: Observable<CartModel>;
    readonly purchasingStatus: Subject<ThanksPurchasingData> = new Subject();
    readonly paymentHtml: Subject<SafeUrl> = new Subject();
    totalAmount: number;

    paymentForm: FormGroup;
    paymentModel: CheckoutPaymentModel;
    paymentFields: FormlyFieldConfig[];

    billingForm: FormGroup;
    billingModel: BillingAddressModel;
    billingFields: FormlyFieldConfig[];

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly paymentService: PaymentsService,
                private readonly toasterService: ToasterService,
                @Inject(DOCUMENT) private readonly document: Document,
                private readonly orderService: OrdersService,
                private readonly changeDetector: ChangeDetectorRef,
                private readonly sessionStorage: SessionStorage,
                private readonly authService: AuthService,
                private readonly cartService: CartService) {
        const {countriesList, page} = activatedRoute.snapshot.data;
        this.countriesList = countriesList;
        this.page = page;
        this.cart = cartService.cart;

        this.cart.subscribe((val: CartModel) => {
            if (val) {
                this.totalAmount = val.totalAmount;
            }
        });

        this.initForm();

        if (this.page === CheckoutPage.Cart) {
            this.handleCartPaymentResponse();
        }
    }

    get startDate() {
        return Date.now();
    }

    get endDate() {
        const plusMonth = new Date();
        plusMonth.setMonth(plusMonth.getMonth() + 1);
        return plusMonth;
    }

    initForm(): void {
        this.paymentForm = new FormGroup({});
        this.paymentModel = getPaymentModel();
        this.paymentFields = getPaymentConfig();

        this.billingForm = new FormGroup({});
        this.billingModel = getBillingModel();
        this.billingFields = getBillingConfig(this.countriesList);
    }

    onCartPayment(): void {
        const payload = this.handlePaymentFormData();

        this.paymentService.payCart(payload)
            .pipe(
                tap((html: string) => this.paymentHtml.next(html)),
                delay(0, animationFrame),
            )
            .subscribe(() => {
                const htmlForm: HTMLFormElement = document.getElementById('frmHtmlCheckout') as HTMLFormElement;

                if (htmlForm) {
                    htmlForm.action = 'https://marlin.firstatlanticcommerce.com/SENTRY/PaymentGateway/Application/DirectAuthLink.aspx';
                    htmlForm.submit();
                }
            });
    }

    onSubscriptionPayment(): void {
        const payload = this.handlePaymentFormData();

        this.paymentService.paySubscription(payload)
            .pipe(
                switchMap(() => this.authService.getProfile())
            )
            .subscribe(
                (u: UserModel) => {
                    this.sessionStorage.updateUserInfo(u);
                    this.purchasingStatus.next(true);
                },
                () => {
                    this.toasterService.pop('error', 'Something went wrong');
                }
            );
    }

    private handlePaymentFormData(): PaymentPayload {
        const {firstName, lastName, cvv, cardNumber, expirationMM, expirationYY} = this.paymentForm.value;
        const { country, city, address, zip, state } = this.billingForm.value;
        const countryDetails = this.countriesList.find(c => c.name === country);

        return {
            firstName,
            lastName,
            city,
            address,
            cvv,
            countryCode: countryDetails.numericCode,
            countryName: countryDetails.name,
            state: !!state ? state : null,
            number: cardNumber,
            cardType: getCardType(cardNumber),
            expirationDate: `${expirationMM}/${expirationYY}`,
            zip: zip,
        };
    }

    private handleCartPaymentResponse() {
        combineLatest(this.cartService.cart, this.activatedRoute.queryParams)
            .pipe(
                filter(([cart, params]) => (
                    !!Object.keys(params).length &&
                    (
                        (!!cart && !cart.items.length && Object.keys(params).includes('order-id')) ||
                        Object.keys(params).includes('message')
                    )
                )),
                take(1),
            )
            .subscribe(([cart, params]) => {
                const orderId = params['order-id'];
                const message = params['message'];

                if (orderId) {
                    this.orderService.getOrderById(orderId)
                        .pipe(
                            filter((paymentDetails: CartPaymentModel) =>
                                (!!paymentDetails.status && paymentDetails.status.includes('Successfull'))
                            ),
                            tap((paymentDetails: CartPaymentModel) => this.purchasingStatus.next(paymentDetails)),
                            switchMap(() => this.orderService.downloadOrderSongsheets(orderId))
                        )
                        .subscribe((data: Blob) => {
                            data.type === 'application/zip' ?
                                saveAs(data, `order-${orderId}.zip`) :
                                saveAs(data, `order-${orderId}.pdf`);

                        });
                }

                if (message) {
                    this.toasterService.pop('error', message);
                }
            });
    }
}
