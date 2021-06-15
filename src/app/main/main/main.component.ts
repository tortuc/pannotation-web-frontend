import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
    isFooterHidden: Observable<boolean>;

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        this.isFooterHidden = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => !!this.activatedRoute.snapshot.firstChild.data['isFooterHidden']),
                startWith(!!this.activatedRoute.snapshot.firstChild.data['isFooterHidden'])
            );
    }
}
