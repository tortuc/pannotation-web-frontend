import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FacebookModule } from 'ngx-facebook';
import { GoogleApiModule, NG_GAPI_CONFIG } from 'ng-gapi';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NotificationService } from './services/notification.service';
import { SearchNotifierService } from './services/search-notifier.service';
import { ModalsModule } from './components/modals/modals.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GOOGLE_CLIENT_ID } from '../environments/environment';
import { ScrollTopService } from './services/scrolltop.service';
import { LoaderModule } from './components/loader/loader.module';
import { LoaderService } from './services/loader.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const gapiClientConfig = {
    client_id: GOOGLE_CLIENT_ID
};

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiClientConfig
        }),
        ToasterModule.forRoot(),
        ModalModule.forRoot(),
        FacebookModule.forRoot(),
        BrowserAnimationsModule,
        CoreModule,
        ModalsModule,
        LoaderModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        ScrollTopService,
        NotificationService,
        SearchNotifierService,
        LoaderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
