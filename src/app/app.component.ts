import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ToasterConfig } from 'angular2-toaster';

import { SessionStorage } from './core/session/session-storage';
import { LangService } from './services/lang.service';
import { ScrollTopService } from './services/scrolltop.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private langSubscription: Subscription;
    public toasterConfig: ToasterConfig = new ToasterConfig({
        showCloseButton: true,
        tapToDismiss: true,
        timeout: 2000
    });

    constructor(private readonly translateService: TranslateService,
                private readonly sessionStorage: SessionStorage,
                private scrollTopService: ScrollTopService,
                private readonly langService: LangService) {
    }

    ngOnInit(): void {
        this.scrollTopService.setScrollTop();
        const currentUser = this.sessionStorage.restore();

        if (currentUser) {
            this.sessionStorage.store(currentUser);
        }

        // setup languages available in the application
        this.translateService.addLangs(this.langService.getLanguages());
        // setup default language
        this.translateService.setDefaultLang(this.langService.defaultLanguage);
        // try to fetch previouly selected language

        // LANGUAGE DETECTION IS DISABLED
        /*
        const lang = this.langService.getLanguage();
        if (lang) {
            // use previously selected language
            this.translateService.use(lang);
        } else {
            // try to fetch browser language
            const browserLang = this.translateService.getBrowserLang();
            // if browser language is supported -> use it
            if (this.translateService.langs.includes(browserLang)) {
                this.translateService.use(browserLang);
            }
        }
        */

        this.langSubscription = this.langService.languageChanges()
            .pipe(distinctUntilChanged())
            .subscribe((newLang) => this.translateService.use(newLang));
    }

    ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }
}
