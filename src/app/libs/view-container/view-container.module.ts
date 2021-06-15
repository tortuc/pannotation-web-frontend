import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewContainerComponent } from './view-container.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ViewContainerComponent
    ],
    exports: [
        ViewContainerComponent
    ]
})
export class ViewContainerModule {
}
