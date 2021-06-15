import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class ScrollTopService {

    constructor(
        private router: Router
    ) { }

    setScrollTop() {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe((event: NavigationEnd) => {
                window.scroll(0, 0);
            });
    }
}
