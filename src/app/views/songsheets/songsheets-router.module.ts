import { Routes } from '@angular/router';

import { SongsheetsComponent } from './songsheets.component';
import { SongsheetsResolver } from '../../resolvers/songsheets.resolver';
import { GenresResolver } from 'src/app/resolvers/genres.resolver';
import { SongsheetResolver } from '../../resolvers/songsheet.resolver';
import { SongsheetDetailsComponent } from './songsheet-details/songsheet-details.component';

export const SongsheetsRoutes: Routes = [
    {
        path: '',
        component: SongsheetsComponent,
        resolve: {
            songsheets: SongsheetsResolver,
            genres: GenresResolver
        }
    },
    {
        path: ':id',
        resolve: {
            songsheet: SongsheetResolver,
        },
        component: SongsheetDetailsComponent
    }
];
