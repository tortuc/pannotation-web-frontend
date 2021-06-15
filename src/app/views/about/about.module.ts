import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { SystemService } from '../../services/system.service';
import { AboutRoutes } from './about.routing';

@NgModule({
    declarations: [AboutComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(AboutRoutes),
    ],
    providers: [SystemService]
})
export class AboutModule {
}
