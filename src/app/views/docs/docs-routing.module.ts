import { Routes } from '@angular/router';

import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DataProcessingComponent } from './data-processing/data-processing.component';
import { SubscriptionAgreementComponent } from './subscription-agreement/subscription-agreement.component';
import { UploadAgreementComponent } from './upload-agreement/upload-agreement.component';

export const DocsRoutes: Routes = [
    {
        path: 'terms-and-conditions',
        component: TermsOfUseComponent
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'data-processing',
        component: DataProcessingComponent
    },
    {
        path: 'subscription-agreement',
        component: SubscriptionAgreementComponent
    },
    {
        path: 'upload-agreement',
        component: UploadAgreementComponent
    }
];
