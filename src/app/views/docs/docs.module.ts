import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { ViewContainerModule } from '../../libs/view-container/view-container.module';
import { DocsRoutes } from './docs-routing.module';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DataProcessingComponent } from './data-processing/data-processing.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { SubscriptionAgreementComponent } from './subscription-agreement/subscription-agreement.component';
import { UploadAgreementComponent } from './upload-agreement/upload-agreement.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        FormlyBootstrapModule,
        TranslateModule.forChild(),
        RouterModule.forChild(DocsRoutes),
        ViewContainerModule
    ],
    providers: [],
    declarations: [
        TermsOfUseComponent,
        DataProcessingComponent,
        PrivacyPolicyComponent,
        RightSidebarComponent,
        SubscriptionAgreementComponent,
        UploadAgreementComponent
    ]
})
export class DocsModule {
}
