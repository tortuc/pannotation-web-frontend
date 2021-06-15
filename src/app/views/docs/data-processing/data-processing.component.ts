import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { en, ru } from '../privacy-policy/locales/locales';
import { LocalizationOptions } from '../../../services/lang.service';

@Component({
    selector: 'app-data-processing',
    templateUrl: './data-processing.component.html',
    styleUrls: ['./data-processing.component.scss'],
})
export class DataProcessingComponent implements OnInit {
    docHtml: string;

    constructor (private readonly translateService: TranslateService) {
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

    private initLang(lang: string) {
        if (lang === LocalizationOptions.En) {
            this.docHtml = en;
            return;
        }

        this.docHtml = ru;
    }
}
