import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherFilesComponent } from './other-files.component';
import { OtherFilesRoutingModule } from './other-files-routing.module';
import { TruncatePipeModule } from '../../pipes/truncate.pipe';
import { OtherFilesService } from '../../services/other-files.service';
import { OtherFileResolver } from '../../resolvers/other-file.resolver';
import { SongsheetPlayerModule } from '../../components/songsheet-player/songsheet-player.module';
import { MarkedDirectiveModule } from '../../core/directives/marked/marked-directive.module';
import { MarkedService } from '../../services/marked.service';

@NgModule({
    declarations: [
        OtherFilesComponent,
    ],
    imports: [
        CommonModule,
        OtherFilesRoutingModule,
        TruncatePipeModule,
        SongsheetPlayerModule,
        MarkedDirectiveModule
    ],
    providers: [
        OtherFilesService,
        MarkedService,
        OtherFileResolver
    ]
})
export class OtherFilesModule {
}
