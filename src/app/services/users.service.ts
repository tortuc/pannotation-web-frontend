import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from '../models/user/user-model';
import { ResponseModel } from '../models/response/response';
import { API_URL_TOKEN } from '../libs/tokens';
import { ProfileModel } from '../views/complete-profile/profile/profile.model';
import { SubscriptionStatus } from '../models/subscriptions/subscription-status';

@Injectable()
export class UsersService {
    private readonly endpoint = '/users';

    private get apiEndpoint() {
        return [this.apiUrl, this.endpoint].join('');
    }

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string,
                private readonly httpClient: HttpClient,
                private readonly sanitizer: DomSanitizer) {
    }

    signUp(user): Observable<UserModel> {
        return this.httpClient
            .post<ResponseModel<UserModel>>(this.apiEndpoint, user)
            .pipe(map((response: ResponseModel<UserModel>) => new UserModel(response.data)));
    }

    getOne(id: number): Observable<UserModel> {
        return this.httpClient
            .get<ResponseModel<UserModel>>(`${this.apiEndpoint}/${id}`)
            .pipe(map((response: ResponseModel<UserModel>) => new UserModel(response.data)));
    }

    setAvatar(originalImageId: number, thumbnailImageId: number): Observable<null> {
        return this.httpClient
            .put<null>(`${this.apiEndpoint}/me/avatar`, { originalImageId, thumbnailImageId });
    }

    editProfile(profile: ProfileModel): Observable<UserModel> {
        return this.httpClient
            .patch<ResponseModel<UserModel>>(`${this.apiEndpoint}/me/profile`, profile)
            .pipe(map((response: ResponseModel<UserModel>) => new UserModel(response.data)));
    }

    changePassword(passwordsPair: { password: string, newPassword: string }): Observable<null> {
        return this.httpClient
            .put<ResponseModel<null>>(`${this.apiEndpoint}/me/password`, passwordsPair)
            .pipe(map(() => null));
    }

    deleteAccount(): Observable<null> {
        return this.httpClient
            .delete<null>(`${this.apiEndpoint}/me`);
    }

    getFile(filePath: string): Observable<SafeUrl> {
        return this.httpClient.get(`${filePath}`, {responseType: 'blob'})
            .pipe(
                map((data) => {
                    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
                })
            );
    }

    checkSubscription(): Observable<SubscriptionStatus> {
        return this.httpClient.get<ResponseModel<SubscriptionStatus>>(`${this.apiEndpoint}/me/subscription`)
            .pipe(map((response: ResponseModel<SubscriptionStatus>) => new SubscriptionStatus(response.data)));
    }
}
