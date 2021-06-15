import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SongsheetTopResolver } from '../../resolvers/songsheet-top.resolver';
import { SongsheetsService } from '../../services/songsheets.service';
import { SearchItemModule } from '../../components/search-item/search-item.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CarouselModule.forRoot(),
        SlickCarouselModule,
        SearchItemModule,
        RouterModule
    ],
    providers: [
        SongsheetsService,
        SongsheetTopResolver
    ]
})
export class HomeModule {
}
