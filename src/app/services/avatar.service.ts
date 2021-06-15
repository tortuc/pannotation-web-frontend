import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { SessionStorage } from '../core/session/session-storage';
import { UserModel } from '../models/user/user-model';

@Injectable()
export class AvatarService implements OnDestroy {
    private oldImage: string;

    private readonly avatarStore: BehaviorSubject<string | undefined> = new BehaviorSubject(undefined);
    private readonly subscription: Subscription = new Subscription();

    constructor(private readonly httpClient: HttpClient,
                private readonly sanitizer: DomSanitizer,
                private readonly sessionStorage: SessionStorage) {
        this.subscription.add(this.sessionStorage.userChanges
            .pipe(
                switchMap((u: UserModel) => {
                    if (u && u.avatar) {
                        if (u.avatar.compactPath !== this.oldImage) {
                            this.oldImage = u.avatar.compactPath;

                            return this.getFile(this.oldImage);
                        } else {
                            return of(this.avatarStore.getValue());
                        }
                    } else {
                        this.oldImage = undefined;

                        return of(undefined);
                    }
                })
            ).subscribe((s: string) => this.avatarStore.next(s)));
    }

    get avatar() {
        return this.avatarStore.asObservable().pipe(shareReplay());
    }

    getFile(filePath: string): Observable<SafeUrl> {
        return this.httpClient.get(`${filePath}`, {responseType: 'blob'})
            .pipe(
                map((data) => {
                    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
                })
            );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
