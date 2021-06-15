import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { VerificationComponent } from './verification.component';
import { VerificationRouter } from './verification.router';
import { VerificationsService } from '../../services/verifications.service';
import { ViewContainerModule } from '../../libs/view-container/view-container.module';

@NgModule({
    imports: [
        CommonModule,
        ViewContainerModule,
        TranslateModule.forChild(),
        RouterModule.forChild(VerificationRouter)
    ],
    providers: [
        VerificationsService
    ],
    declarations: [VerificationComponent]
})
export class VerificationModule {
}
