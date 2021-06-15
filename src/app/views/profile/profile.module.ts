import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationConfig, PaginationModule, TabsModule } from 'ngx-bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { DropdownModule } from '../../components/dropdown/dropdown.module';
import { CommonInfoResolver } from '../../resolvers/common-info.resolver';
import { CommonInfoService } from '../../services/common-info.service';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { PhotoModule } from '../../components/photo/photo.module';
import { ImagesService } from '../../services/images.service';
import { ProfileSellsheetsComponent } from './profile-sellsheets/profile-sellsheets.component';
import { ProfileSubscriptionComponent } from './profile-subscription/profile-subscription.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { OrdersService } from '../../services/orders.service';
import { PhoneNumberPipe } from '../../pipes/phone-number.pipe';
import { ActiveSubscriptionModule } from 'src/app/components/active-subscription/active-subscription.module';
import { SubscriptionStatusResolver } from 'src/app/resolvers/subscription-status.resolver';
import { UsersService } from 'src/app/services/users.service';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileEditComponent,
        ProfileSettingsComponent,
        ProfileInfoComponent,
        ProfileSellsheetsComponent,
        ProfileSubscriptionComponent,
        ProfileOrdersComponent,
        PhoneNumberPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownModule,
        RouterModule.forChild(ProfileRoutes),
        TranslateModule.forChild(),
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
            types: [
                { name: 'dropdown', component: DropdownComponent },
            ],
        }),
        FormlyBootstrapModule,
        TabsModule.forRoot(),
        PhotoModule,
        PaginationModule,
        FormsModule,
        ActiveSubscriptionModule
    ],
    providers: [
        CommonInfoService,
        ImagesService,
        OrdersService,
        PaginationConfig,
        CommonInfoResolver,
        UsersService,
        SubscriptionStatusResolver
    ]
})
export class ProfileModule { }
