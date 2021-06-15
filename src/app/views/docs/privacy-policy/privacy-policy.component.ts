import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { en, ru } from './locales/locales';
import { LocalizationOptions } from '../../../services/lang.service';

@Component({
    selector: 'app-terms-of-use',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent implements OnInit {
    docHtml: string;

    constructor(private readonly translateService: TranslateService) {
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
