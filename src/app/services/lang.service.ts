import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum LocalizationOptions {
    En = 'en',
    Ru = 'ru'
}

@Injectable()
export class LangService {
    private static readonly storageKey = 'market::lang';
    private static readonly inAppLanguages = Object.keys(LocalizationOptions).map(key => LocalizationOptions[key]);

    readonly defaultLanguage = LocalizationOptions.En;

    private activeLanguage: string | undefined;
    private languageNotifier = new Subject<string>();

    private hasStorage(): boolean {
        return window && window.localStorage instanceof Storage;
    }

    getLanguages(): string[] {
        return [].concat(LangService.inAppLanguages);
    }

    getLanguage(): string | undefined {
        if (!this.activeLanguage && this.hasStorage()) {
            this.activeLanguage = localStorage.getItem('market::lang');
        }

        return this.activeLanguage;
    }

    languageChanges(): Observable<string> {
        return this.languageNotifier.asObservable();
    }

    setLanguage(lang: string): void {
        this.activeLanguage = lang;

        if (this.hasStorage()) {
            window.localStorage.setItem(LangService.storageKey, this.activeLanguage);
        }

        this.languageNotifier.next(this.activeLanguage);
    }
}
