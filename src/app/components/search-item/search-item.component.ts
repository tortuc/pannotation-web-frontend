import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SongsheetModel } from '../../models/songsheet/songsheet-model';
import { OtherFilesTypes } from '../../core/enums/other-files-types';

@Component({
    selector: 'app-search-item',
    templateUrl: './search-item.component.html',
    styleUrls: ['./search-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchItemComponent {
    @Input() songsheet: SongsheetModel;
    @Input() forSlider ? = false;
    readonly otherFileTypes: typeof OtherFilesTypes = OtherFilesTypes;

    constructor(private readonly router: Router) {
    }

    get instruments(): string {
        if (!this.songsheet ||
            !this.songsheet.instruments ||
            !this.songsheet.instruments.length) {
            return '';
        }

        const contentToShow: string[] = this.songsheet.instruments;

        const contentToShowLength = contentToShow.length;
        return (contentToShowLength <= 4
            ? contentToShow
            : contentToShow.slice(0, 4).concat('and more')).join(' · ');
    }

    get genres(): string {
        if (!this.songsheet ||
            !this.songsheet.genres ||
            !this.songsheet.genres.length) {
            return '';
        }

        const contentToShow: string[] = this.songsheet.genres;

        const contentToShowLength = contentToShow.length;
        return (contentToShowLength <= 4
            ? contentToShow
            : contentToShow.slice(0, 4).concat('and more')).join(' · ');
    }

    onBuyClick(id: number): void {
        this.router.navigate(['/music-scores', id]);
    }

    onShowClick(id: number): void {
        this.router.navigate(['/other', id]);
    }
}
