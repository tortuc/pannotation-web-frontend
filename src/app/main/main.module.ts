import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap';

import {
    maxlengthValidationMessage,
    maxValidationMessage,
    minlengthValidationMessage,
    minValidationMessage
} from '../core/validation/rules';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { ProviderGuard } from '../guards/provider.guard';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuProfileModule } from '../components/menu-profile/menu-profile.module';
import { CartService } from '../services/cart.service';
import { UnsubscribedGuard } from '../guards/unsubscribed.guard';

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                {name: 'required', message: 'This field is required'},
                {name: 'minlength', message: minlengthValidationMessage},
                {name: 'maxlength', message: maxlengthValidationMessage},
                {name: 'min', message: minValidationMessage},
                {name: 'max', message: maxValidationMessage},
            ],
        }),
        FormlyBootstrapModule,
        TranslateModule.forChild(),
        BsDropdownModule.forRoot(),
        MainRoutingModule,
        MenuProfileModule
    ],
    providers: [
        UsersService,
        AuthGuard,
        ProviderGuard,
        UnsubscribedGuard,
        AuthService,
        CartService
    ]
})
export class MainModule {
}
