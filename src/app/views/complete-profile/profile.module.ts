import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';

import { ProfileRouter } from './profile.router';
import { ProfileComponent } from './profile/profile.component';
import { PhotoModule } from '../../components/photo/photo.module';
import { CommonInfoService } from '../../services/common-info.service';
import { CommonInfoResolver } from '../../resolvers/common-info.resolver';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { DropdownModule } from '../../components/dropdown/dropdown.module';
import { ImagesService } from '../../services/images.service';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { ModalsModule } from '../../components/modals/modals.module';
import { AuthService } from '../../services/auth.service';
import { ProfileResolver } from '../../resolvers/profile.resolver';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    RouterModule.forChild(ProfileRouter),
    FormlyModule.forRoot({
      validationMessages: [
          { name: 'required', message: 'This field is required' },
      ],
      types: [
        { name: 'dropdown', component: DropdownComponent },
      ],
    }),
    FormlyBootstrapModule,
    TranslateModule.forChild(),
    PhotoModule,
    AngularCropperjsModule,
    ModalsModule
  ],
  providers: [
    CommonInfoService,
    ImagesService,
    CommonInfoResolver,
    AuthService,
    ProfileResolver
  ],
})
export class ProfileModule { }
