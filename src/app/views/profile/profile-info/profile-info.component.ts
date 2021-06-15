import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

import { ProfileEditModel } from '../profile-edit/profile-edit.model';
import { AuthService } from '../../../services/auth.service';
import { getFields, getModel } from '../profile-edit/profile-edit-form.config';
import { UserModel } from '../../../models/user/user-model';
import { ProfileInfoState } from '../../../core/enums/profile-info-state.enum';
import { SessionStorage } from '../../../core/session/session-storage';
import { UsersService } from '../../../services/users.service';
import { AvatarService } from '../../../services/avatar.service';
import { Country } from '../../../models/country/country';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInfoComponent implements OnDestroy, OnInit {
    readonly profile: Observable<UserModel>;
    readonly countriesList: Country[];
    readonly subscriptions: Subscription = new Subscription();
    readonly avatar: Observable<string | undefined>;
    readonly activeScreen: BehaviorSubject<ProfileInfoState> = new BehaviorSubject(ProfileInfoState.Info);
    readonly fieldNames: string[] = ['country', 'state', 'city', 'address', 'zip', 'phoneNumber', 'mobileNumber'];
    readonly fieldLabels: Map<string, string> = new Map([
        ['country', 'Country'],
        ['state', 'State'],
        ['city', 'City'],
        ['address', 'Address'],
        ['zip', 'ZIP-code'],
        ['phoneNumber', 'Phone number'],
        ['mobileNumber', 'Mobile number']
    ]);
    readonly PROFILE_STATES = ProfileInfoState;

    profileForm: FormGroup;
    model: ProfileEditModel;
    fields: FormlyFieldConfig[];

    constructor(private readonly authService: AuthService,
                private translate: TranslateService,
                private readonly sessionStorage: SessionStorage,
                private readonly avatarService: AvatarService,
                private readonly usersService: UsersService,
                private readonly activatedRoute: ActivatedRoute) {
        const { countriesList } = activatedRoute.snapshot.data;
        this.countriesList = countriesList;

        this.profile = this.sessionStorage.userChanges;

        this.initForm(this.sessionStorage.userStorage);

        this.avatar = this.avatarService.avatar;
    }

    private initForm(user: UserModel): void {
        this.profileForm = new FormGroup({});
        this.model = getModel(user);
        this.fields = getFields(this.translate, this.countriesList, user.country);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    ngOnInit(): void {
        this.subscriptions.add(this.profileForm.valueChanges
            .pipe(
                filter((form: ProfileEditModel) => !form.isComposer && !!form.idCode),
                map(() => {
                    this.profileForm.controls.idCode.setValue(undefined);
                    this.profileForm.controls.idCode.markAsDirty();
                })
            )
            .subscribe()
        );
    }

    onEditClick(): void {
        this.activeScreen.next(this.PROFILE_STATES.Edit);
    }
}
