import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkedDirective } from './marked.directive';

@NgModule({
    declarations: [MarkedDirective],
    imports: [CommonModule],
    exports: [MarkedDirective]
})
export class MarkedDirectiveModule {
}
