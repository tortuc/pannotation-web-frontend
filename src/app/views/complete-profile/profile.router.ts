import { Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { CommonInfoResolver } from '../../resolvers/common-info.resolver';
import { ProfileResolver } from 'src/app/resolvers/profile.resolver';

export const ProfileRouter: Routes = [
    {
        path: '',
        component: ProfileComponent,
        resolve: {
            countriesList: CommonInfoResolver,
            userData: ProfileResolver
        }
    }
];
