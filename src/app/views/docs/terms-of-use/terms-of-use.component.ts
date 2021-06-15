import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ScrollTopService } from '../../../services/scrolltop.service';
import { en, ru } from './locales/locales';
import { LocalizationOptions } from '../../../services/lang.service';

@Component({
    selector: 'app-terms-of-use',
    styleUrls: ['./terms-of-use.component.scss'],
    templateUrl: 'terms-of-use.component.html'
})
export class TermsOfUseComponent implements OnInit, AfterViewInit {
    docHtml: string;

    constructor (private scrollTopService: ScrollTopService, private readonly translateService: TranslateService) {
    }

    ngOnInit() {
        this.initLang(this.translateService.currentLang);
        this.translateService.onLangChange.subscribe((lang) => {
            if (lang.lang === LocalizationOptions.En) {
                this.docHtml = en;
                return;
            }

            this.docHtml = ru;
        });
    }

    ngAfterViewInit() {
    }

    private initLang(lang: string) {
        if (lang === LocalizationOptions.En) {
            this.docHtml = en;
            return;
        }

        this.docHtml = ru;
    }
}
