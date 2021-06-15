import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';

import { getFields, getModel } from './fill-profile-form.configs';
import { FillProfileModel } from './fill-profile.model';
import { User } from '../../../models/user/user';
import { SocialType } from '../../../models/user/social-types';

@Component({
    selector: 'app-fill-profile',
    templateUrl: './fill-profile.component.html',
    styleUrls: ['./fill-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FillProfileComponent implements OnInit, OnDestroy {
    @Input() user: User;
    @Input() social: SocialType;
    @Input() email: string | undefined;

    model: FillProfileModel;
    fields: FormlyFieldConfig[];

    formData = new Subject<FillProfileModel>();
    form = new FormGroup({});

    constructor(public readonly dialogRef: BsModalRef) {
    }

    ngOnInit() {
        this.model = getModel(this.user, this.social, this.email);
        this.fields = getFields(this.social);
    }

    submit(formData: FillProfileModel): void {
        this.formData.next(formData);
        this.dialogRef.hide();
    }

    ngOnDestroy(): void {
        this.formData.complete();
    }
}
