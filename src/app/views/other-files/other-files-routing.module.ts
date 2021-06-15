import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { OtherFilesComponent } from './other-files.component';
import { UnsubscribedGuard } from '../../guards/unsubscribed.guard';
import { OtherFileResolver } from '../../resolvers/other-file.resolver';

const routes: Route[] = [
    {
        path: 'other/:id',
        component: OtherFilesComponent,
        canActivate: [UnsubscribedGuard],
        resolve: {
            data: OtherFileResolver
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class OtherFilesRoutingModule {
}
