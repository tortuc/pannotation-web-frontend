import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleAuthService } from 'ng-gapi';
import { switchMap } from 'rxjs/internal/operators';
import { from } from 'rxjs';

@Injectable()
export class GoogleLoginService {
    constructor(private http: HttpClient, private googleAuthService: GoogleAuthService) {
    }
    getAuth() {
            return this.googleAuthService.getAuth()
                .pipe(switchMap(auth => from(auth.signIn())));
    }
}
