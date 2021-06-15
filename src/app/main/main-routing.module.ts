import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AuthGuard } from '../guards/auth.guard';
import { UnsubscribedGuard } from '../guards/unsubscribed.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../views/home/home.module').then(m => m.HomeModule)
            },
            {
                path: '',
                loadChildren: () => import('../views/docs/docs.module').then(m => m.DocsModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('../views/sign-up/sign-up.module').then(m => m.SignUpModule),
                data: {
                    isFooterHidden: true
                }
            },
            {
                path: 'sign-in',
                loadChildren: () => import('../views/sign-in/sign-in.module').then(m => m.SignInModule),
                data: {
                    isFooterHidden: true
                }
            },
            {
                path: 'restore-password',
                loadChildren: () => import('../views/restore-password/restore-password.module').then(m => m.RestorePasswordModule),
                data: {
                    isFooterHidden: true
                }
            },
            {
                path: 'reset-password',
                loadChildren: () => import('../views/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
                data: {
                    isFooterHidden: true
                }
            },
            {
                path: 'confirm-email',
                loadChildren: () => import('../views/verification/verification.module').then(m => m.VerificationModule),
                data: {
                    isFooterHidden: true
                }
            },
            {
                path: 'subscription',
                loadChildren: () => import('../views/subscription/subscription.module').then(m => m.SubscriptionModule)
            },
            {
                path: 'complete-profile',
                loadChildren: () => import('../views/complete-profile/profile.module').then(m => m.ProfileModule),
                canActivate: [AuthGuard],
                data: {
                    isFooterHidden: true
                }
            },
            {
                path: 'music-scores',
                loadChildren: () => import('../views/songsheets/songsheets.module').then(m => m.SongsheetsModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('../views/profile/profile.module').then(m => m.ProfileModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'contact-us',
                loadChildren: () => import('../views/contact-us/contact-us.module').then(m => m.ContactUsModule)
            },
            {
                path: 'about',
                loadChildren: () => import('../views/about/about.module').then(m => m.AboutModule)
            },
            {
                path: 'cart',
                loadChildren: () => import('../views/cart/cart.module').then(m => m.CartModule)
            },
            {
                path: '',
                loadChildren: () => import('../views/other-files/other-files.module').then(m => m.OtherFilesModule),
                canLoad: [AuthGuard, UnsubscribedGuard]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
