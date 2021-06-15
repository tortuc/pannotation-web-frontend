import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoComponent } from './photo.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PhotoComponent,
    ],
    exports: [
        PhotoComponent,
    ]
})
export class PhotoModule {
}
