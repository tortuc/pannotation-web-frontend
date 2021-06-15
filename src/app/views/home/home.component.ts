import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { map, shareReplay, skip, switchMap } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { SongsheetModel } from '../../models/songsheet/songsheet-model';
import { SongsheetsService } from '../../services/songsheets.service';

export interface FeaturedFilter {
    Limit: number;
    Offset: number;
}

const MAIN_SLIDES = [
    {
        title: 'Pan scores now available in one place',
        descr: 'Access several steelband arrangements, compositions, solo works and much more.',
        linkText: 'VIEW LIBRARY',
        linkRoute: '/music-scores',
        img: 'assets/img/home/im_banner_1slide.jpg',
    },
    {
        title: 'Access educational materials on the steelpan from anywhere',
        descr: `Read tons of articles, acquire steelband information from around the world,
         listen to interviews never heard before and much more.`,
        linkText: 'Subscribe Now',
        linkRoute: '/subscription',
        img: 'assets/img/home/im_banner_3slide.jpg',
    },
    {
        title: 'Be a part of the global pan community',
        descr: `Have music, articles, steelband profiles, podcasts, or other information you'd like to make available?`,
        linkText: 'Upload Now',
        linkRoute: 'mailto:pannotationmusic@gmail.com?subject=Pannotation Files for Submission',
        img: 'assets/img/home/im-banner@3x.jpg',
    }
];

const ABOUT_BLOCKS = [
    {
        descr: `Our site functions as an online store for steelpan scores where music can be uploaded by users and downloaded
         via purchases where composers and arrangers earn per download.`,
        title: 'Composer. Arrangers. Transcribers',
        titleImg: '/assets/img/ic-keynote-on-dark-bg.svg'
    },
    {
        descr: `We also function as a subscription-based portal for steelpan information. Get unlimited access to podcasts,
         audio recordings, dissertations, theses, lead sheets, global steelband profiles, historical data and much more.
         Subscribers  are able to upload materials and contribute to the PanNotation library following quality checks by
         our PanNotation team.`,
        title: 'Music sheets. Podcasts. Articles etc.',
        titleImg: '/assets/img/ic-keynote-on-light-bg.svg'
    },
    {
        descr: `All PanNotation profits are dedicated to our Not-for-Profit arm, which assists with funding for scholarships,
         grants, international performances and other community based projects.`,
        title: 'Musicians. Publisher. Educators',
        titleImg: '/assets/img/ic-keynote-on-dark-bg.svg'
    }
];

const SUBSCRIPTIONS = [
    {
        title: 'CONDUCT RESEARCH',
        descr: 'Find various types of information about the steepan from different decades. '
    },
    {
        title: 'Access Anywhere',
        descr: 'Access your account and downloaded scores from your mobile device.'
    },
    {
        title: 'Print Instantly',
        descr: 'Checkout and print instantly from your desktop or mobile device ' +
            'with our quick and easy purchase process.'
    },
    {
        title: 'SCORE UPLOAD',
        descr: 'Upload your pan scores at no additional cost, track downloads, and reach more people'
    },
];

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
    readonly subscriptions = SUBSCRIPTIONS;
    readonly slides = MAIN_SLIDES;
    readonly aboutBlocks = ABOUT_BLOCKS;

    featured: BehaviorSubject<SongsheetModel[]>;

    topOffset = 0;
    topLimit = 10;
    totalCount: number;

    readonly featuredFilters: BehaviorSubject<FeaturedFilter> = new BehaviorSubject({ Limit: this.topLimit, Offset: this.topOffset });
    readonly subscription: Subscription = new Subscription();

    cardsRowConfig: Observable<Object>;
    mainRowConfig: Object;
    isMobile: Observable<boolean>;
    leftArrowBtnDisabled = true;
    rightArrowBtnDisabled = false;

    constructor(private readonly breakpointObserver: BreakpointObserver,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly songsheetService: SongsheetsService,
        private readonly activatedRoute: ActivatedRoute) {
        const { featured } = activatedRoute.snapshot.data;
        this.featured = new BehaviorSubject<SongsheetModel[]>(featured.data);

        this.totalCount = featured.pagination.totalCount;
    }

    ngOnInit(): void {
        this.isMobile = this.breakpointObserver.observe('(max-width: 575px)')
            .pipe(
                map((val) => val.matches),
                shareReplay()
            );

        this.cardsRowConfig = this.isMobile
            .pipe(
                map((isMobile) => {
                    return {
                        variableWidth: true,
                        slidesToScroll: 2,
                        swipe: true,
                        infinite: false,
                        arrows: false,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    arrows: false,
                                }
                            },
                            {
                                breakpoint: 991,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    arrows: false,
                                }
                            },
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    centerMode: true,
                                    arrows: true
                                }
                            },
                            {
                                breakpoint: 576,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    centerMode: true,
                                    arrows: true
                                }
                            },
                        ]

                    };
                })
            );

        this.mainRowConfig = this.isMobile
            .pipe(
                map((isMobile) => {
                    return {
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        appendArrows: false,
                        swipe: true,
                        dots: !isMobile,
                        infinite: true,
                        autoplay: true,
                        autoplaySpeed: 5000,
                    };
                }),
            );

        this.subscription.add(this.featuredFilters
            .pipe(
                skip(1),
                switchMap((filters: FeaturedFilter) => this.songsheetService.topList(filters))
            )
            .subscribe(({ data, pagination }) => {
                this.totalCount = pagination.totalCount;
                this.featured.next(this.featured.getValue().concat(data));
            }));
    }

    beforeSlideChange(e): void {
        const currentSlide = e.nextSlide;
        const maxValue = this.featured.getValue().length;
        const index = e.nextSlide - e.currentSlide;

        if ((currentSlide >= (maxValue - 1 - index)) && this.totalCount > maxValue) {
            this.topOffset = this.topOffset + this.topLimit;

            this.featuredFilters.next({ Limit: this.topLimit, Offset: this.topOffset });
        }

        this.leftArrowBtnDisabled = currentSlide === 0;
        this.rightArrowBtnDisabled = e.nextSlide + index >= this.totalCount;
    }

    trackByFn(i, item) {
        return item.id;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
