import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ProfileTabs } from '../../core/enums/profile-tabs.enum';
import { shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../../styles/shared/tabset.scss', './profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnDestroy {
    readonly ProfileTabs = ProfileTabs;
    readonly activeTab: BehaviorSubject<ProfileTabs> = new BehaviorSubject(ProfileTabs.Profile);

    readonly subscription: Subscription = new Subscription();

    constructor(private readonly activatedRoute: ActivatedRoute) {
        const activeObservable = this.activatedRoute.queryParams
            .subscribe((params: Params) => {
                const active = params.active;

                if (active !== undefined && !!parseInt(active, 10)) {
                    this.activeTab.next(parseInt(active, 10));
                }
            });

        this.subscription.add(activeObservable);
    }

    get active() {
        return this.activeTab.asObservable().pipe(shareReplay());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
