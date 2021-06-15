import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrderCardComponent } from './order-card.component';

@NgModule({
    declarations: [
        OrderCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        OrderCardComponent
    ]
})
export class OrderCardModule {
}
