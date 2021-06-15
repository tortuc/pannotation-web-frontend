import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { MenuProfileComponent } from './menu-profile.component';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
    declarations: [
        MenuProfileComponent
    ],
    imports: [
        CommonModule,
        BsDropdownModule.forRoot(),
        TranslateModule.forChild(),
        PhotoModule,
        RouterModule
    ],
    exports: [
        MenuProfileComponent
    ]
})
export class MenuProfileModule {
}
