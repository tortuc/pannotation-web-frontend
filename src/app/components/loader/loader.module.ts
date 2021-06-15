import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoaderComponent } from './loader.component';
import { LoaderInterceptor } from './loader.interceptor';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LoaderComponent,
    ],
    exports: [
        LoaderComponent,
    ],
    entryComponents: [
        LoaderComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        }
    ],
})
export class LoaderModule { }
