import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';

import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { DropdownModule } from '../../components/dropdown/dropdown.module';
import { SafePipe } from '../../pipes/safe-url.pipe';
import { GenresResolver } from '../../resolvers/genres.resolver';
import { SongsheetResolver } from '../../resolvers/songsheet.resolver';
import { SongsheetsResolver } from '../../resolvers/songsheets.resolver';
import { CommonInfoService } from '../../services/common-info.service';
import { GenresService } from '../../services/genres.service';
import { SongsheetsService } from '../../services/songsheets.service';
import { SongsheetDetailsComponent } from './songsheet-details/songsheet-details.component';
import { SongsheetsRoutes } from './songsheets-router.module';
import { SongsheetsComponent } from './songsheets.component';
import { ArrayUppercasePipe } from 'src/app/pipes/array-uppercase.pipe';
import { SearchItemModule } from '../../components/search-item/search-item.module';
import { TruncatePipeModule } from '../../pipes/truncate.pipe';
import { SearchResultsTypesPipe } from '../../pipes/search-results-types.pipe';
import { SongsheetPlayerModule } from '../../components/songsheet-player/songsheet-player.module';

@NgModule({
    declarations: [
        SongsheetsComponent,
        SongsheetDetailsComponent,
        SafePipe, ArrayUppercasePipe,
        SearchResultsTypesPipe
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(SongsheetsRoutes),
        SearchItemModule,
        DropdownModule,
        FormlyModule.forRoot({
            validationMessages: [
                {
                    name: 'required',
                    message: 'This field is required'
                },
            ],
            types: [
                {
                    name: 'dropdown',
                    component: DropdownComponent
                },
            ],
        }),
        FormlyBootstrapModule,
        ReactiveFormsModule,
        TruncatePipeModule,
        SongsheetPlayerModule
    ],
    providers: [
        SongsheetsService,
        SongsheetsResolver,
        SongsheetResolver,
        CommonInfoService,
        GenresResolver,
        GenresService
    ],
})
export class SongsheetsModule {
}
