import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, iif, of } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap';
import { mergeMap, switchMap } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';

import { ProfileEditModel } from './profile-edit.model';
import { ProfileInfoState } from '../../../core/enums/profile-info-state.enum';
import { AuthService } from '../../../services/auth.service';
import { ImageCropComponent } from '../../../components/modals/image-crop/image-crop.component';
import { FilesHelper } from '../../../core/helpers/files-helper';
import { ImageType } from '../../../models/image/image-type';
import { ImagesService } from '../../../services/images.service';
import { ImageResponseModel } from '../../../models/image';
import { ResponseModel } from '../../../models/response/response';
import { UserModel } from '../../../models/user/user-model';
import { SessionStorage } from '../../../core/session/session-storage';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditComponent implements OnChanges {
    @Input() readonly profileForm: FormGroup;
    @Input() readonly model: ProfileEditModel;
    @Input() readonly avatar: string;
    @Input() readonly activeState: BehaviorSubject<ProfileInfoState>;
    @Input() readonly fields: FormlyFieldConfig[];

    @ViewChild('imageInput', { static: false }) private imageInput: ElementRef;

    readonly photo = new BehaviorSubject<string>(undefined);

    isNewPhoto = false;

    constructor(private readonly authService: AuthService,
                private readonly imagesService: ImagesService,
                private readonly toastrService: ToasterService,
                private readonly sessionStorage: SessionStorage,
                private readonly modalService: BsModalService) {
    }

    private onSaveClick() {
        this.activeState.next(ProfileInfoState.Info);
    }

    submit(form: ProfileEditModel): void {
        if (!form.mobileNumber) {
            form.mobileNumber = null;
        }

        if (!form.state) {
            form.state = null;
        }

        if (this.isNewPhoto) {
            this.isNewPhoto = false;
            const body = new FormData();
            const photoFile = FilesHelper.dataUrlToFile(this.photo.getValue());

            body.append('file', photoFile);

            this.imagesService.uploadImage(body, ImageType.Avatar)
                .pipe(
                    switchMap((data: ResponseModel<ImageResponseModel>) => {
                        form.imageId = data.data.id;

                        return this.authService.patchProfile(form);
                    })
                )
                .subscribe((user: UserModel) => {
                    this.sessionStorage.updateUserInfo(user);
                    this.onSaveClick();
                });
        } else {
            this.authService.patchProfile(form)
                .pipe(
                    mergeMap((user: UserModel) => (
                        iif(() => !this.photo.getValue() && !!user.avatar,
                            this.authService.deletePhoto(), of(user)))
                    )
                )
                .subscribe((user: UserModel) => {
                    this.sessionStorage.updateUserInfo(user);
                    this.onSaveClick();
                });
        }
    }

    onPhotoDelete(): void {
        this.photo.next(undefined);
        this.isNewPhoto = false;
    }

    onCancelClick() {
        this.onSaveClick();
        this.photo.next(undefined);
    }

    changePhotoHandler(file: File): void {
        const ext = file['name'].substring(file['name'].lastIndexOf('.') + 1).toLowerCase();

        if (ext !== 'jpg' && ext !== 'png' && ext !== 'jpeg') {
            this.toastrService.pop('error', 'Incorrect image format. Allowed formats is jpg, jpeg, png');
            return;
        }

        // 10 Mb
        if (file.size > 10485760) {
            this.toastrService.pop('error', 'File is too large. Max file size is 10 Mb');
            return;
        }

        const img = new Image();
        img.onload = () => {
            if (img.width < 150 || img.height < 150) {
                this.toastrService.pop('error', 'Minimum size of avatar should be 150x150');
                return;
            }

            const fileReader = new FileReader();

            fileReader.onload = () => {
                const dialogRef = this.modalService.show(ImageCropComponent, {
                    initialState: {
                        imageSource: fileReader.result,
                    },
                    class: 'image-crop',
                });

                (<ImageCropComponent>dialogRef.content).imageCropped
                    .subscribe((e: string) => {
                        (this.imageInput.nativeElement as HTMLInputElement).value = '';
                        this.photo.next(e);
                        this.isNewPhoto = true;
                    });

                this.modalService.onHidden
                    .subscribe(() => (this.imageInput.nativeElement as HTMLInputElement).value = '');
            };

            fileReader.readAsDataURL(file);
        };

        img.src = URL.createObjectURL(file);
    }

    ngOnChanges({avatar}: SimpleChanges): void {
        if (avatar && avatar.currentValue) {
            this.photo.next(avatar.currentValue.changingThisBreaksApplicationSecurity);
        }
    }
}
