import { Injectable } from '@angular/core';
import { FacebookService, LoginOptions, LoginResponse } from 'ngx-facebook';
import { Observable, defer } from 'rxjs';

import { FacebookSocialConfig } from '../../environments/environment';

@Injectable()
export class FacebookLoginService {
    constructor(private fb: FacebookService) {
        this.fb.init(FacebookSocialConfig);
    }

    getToken(): Observable<LoginResponse> {
        const loginOptions: LoginOptions = {
            enable_profile_selector: true,
            return_scopes: true,
            scope: 'public_profile, email'
        };

        return defer(() => this.fb.login(loginOptions));
    }

    getUser(): Observable<{ id: string, name: string, email?: string }> {
        return defer(() => this.fb.api('me?fields=id,name,email'));
    }

    signOut(): Observable<any> {
        return defer(() => this.fb.logout());
    }
}
