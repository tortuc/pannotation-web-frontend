import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserModel } from '../../models/user/user-model';
import { UsersService } from '../../services/users.service';
import { ProfileTabs } from '../../core/enums/profile-tabs.enum';
import { AvatarService } from '../../services/avatar.service';

@Component({
    selector: 'app-menu-profile',
    templateUrl: './menu-profile.component.html',
    styleUrls: ['./menu-profile.component.scss']
})
export class MenuProfileComponent implements OnInit, OnChanges {
    @Input() user: UserModel;
    @Input() isMobile: boolean;
    @Output() navClicked = new EventEmitter();
    readonly userStorage = new BehaviorSubject<UserModel>(undefined);
    readonly ProfileTabs = ProfileTabs;
    avatarImage: Observable<SafeUrl>;

    constructor(private readonly usersService: UsersService,
                private readonly avatarService: AvatarService) {
    }

    ngOnInit(): void {
        this.userStorage.next(this.user);
        this.avatarImage = this.avatarService.avatar;
    }

    ngOnChanges({user}: SimpleChanges): void {
        if (user && user.currentValue) {
            this.userStorage.next(user.currentValue);
        }
    }

    logout(): void {
        this.navClicked.emit('logout');
    }

}
