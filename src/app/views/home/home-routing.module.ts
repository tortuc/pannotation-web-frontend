import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { SongsheetTopResolver } from '../../resolvers/songsheet-top.resolver';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            featured: SongsheetTopResolver
        }
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class HomeRoutingModule {
}
