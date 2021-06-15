import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { OtherFileModel } from '../../models/otherfile/otherfile-model';
import { OtherFilesService } from '../../services/other-files.service';
import { OtherFilesTypes } from '../../core/enums/other-files-types';

@Component({
    selector: 'app-other-files',
    templateUrl: './other-files.component.html',
    styleUrls: ['./other-files.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherFilesComponent {
    readonly otherFile: OtherFileModel;
    readonly ap: string = 'AudioPublication';
    readonly file: Observable<Blob>;
    readonly types: typeof OtherFilesTypes = OtherFilesTypes;

    constructor(
        private router: Router,
        private ofService: OtherFilesService,
        @Inject(DOCUMENT) private readonly document: Document,
        private activatedRoute: ActivatedRoute) {
        this.otherFile = this.activatedRoute.snapshot.data.data;

        this.file = this.ofService.getPrivateFile(this.otherFile.file.path)
            .pipe(shareReplay());
    }

    onSaveClick(path: string): void {
       this.file
            .subscribe((data: Blob) => {
                saveAs(data, path.split('/').pop());
            });
    }
}
