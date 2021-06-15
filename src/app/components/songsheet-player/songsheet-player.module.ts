import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';

import { SongsheetPlayerComponent } from './songsheet-player.component';

@NgModule({
    declarations: [SongsheetPlayerComponent],
    imports: [
        CommonModule,
        NgxBootstrapSliderModule,
    ],
    exports: [SongsheetPlayerComponent]
})
export class SongsheetPlayerModule {
}
