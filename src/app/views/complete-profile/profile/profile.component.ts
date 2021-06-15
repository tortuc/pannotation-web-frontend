import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';

import { UsersService } from '../../../services/users.service';
import { ImagesService } from '../../../services/images.service';
import { ImageType } from '../../../models/image/image-type';
import { FilesHelper } from '../../../core/helpers/files-helper';
import { SessionStorage } from '../../../core/session/session-storage';
import { AppUser } from '../../../core/session/app-user';
import { ImageCropComponent } from '../../../components/modals/image-crop/image-crop.component';
import { getFieldsStep1, getFieldsStep2 } from './profile.configs';
import { ProfileModel, FillingStep } from './profile.model';
import { UserModel } from '../../../models/user/user-model';
import { Country } from '../../../models/country/country';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../../styles/shared/auth.styles.scss', './profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

  formStep1: FormGroup;
  formStep2: FormGroup;
  model: ProfileModel;
  fieldsStep1: FormlyFieldConfig[];
  fieldsStep2: FormlyFieldConfig[];
  readonly fillingStep = new BehaviorSubject<FillingStep>(FillingStep.step1);
  readonly photo = new BehaviorSubject<string>(undefined);
  readonly fileReader = new FileReader();
  readonly photoErrorMessage = new BehaviorSubject<string>('');
  readonly userData: UserModel;
  countriesList: Country[];

  @ViewChild('imageInput', { static: false }) private imageInput: ElementRef;

  constructor(
      private translate: TranslateService,
      private readonly activatedRoute: ActivatedRoute,
      private readonly router: Router,
      private readonly usersService: UsersService,
      private readonly imagesService: ImagesService,
      private readonly sessionsStorage: SessionStorage,
      private readonly modalService: BsModalService) {
      const { countriesList, userData } = activatedRoute.snapshot.data;
      this.countriesList = countriesList;
      this.userData = userData;
      this.sessionsStorage.updateUserInfo(userData);

      this.initForm();
  }

  private initForm(): void {
      this.formStep1 = new FormGroup({});
      this.formStep2 = new FormGroup({});
      this.model = this.getModel();

      this.fieldsStep1 = getFieldsStep1(this.translate, this.userData);
      this.fieldsStep2 = getFieldsStep2(this.countriesList);
  }

  submitFirstStep(model: ProfileModel): void {
      if (model.isComposer === false) {
        model.idCode = null;
      }

      this.fillingStep.next(FillingStep.step2);
  }

  submitSecondStep(model: ProfileModel): void {

      if (model.mobileNumber === '') {
        model.mobileNumber = null;
      }

      if (model.state === '') {
        model.state = null;
      }

      if (this.photo.getValue()) {
        const body = new FormData();
        const photoFile = FilesHelper.dataUrlToFile(this.photo.getValue());

        body.append('file', photoFile);

        this.imagesService.uploadImage(body, ImageType.Avatar)
          .subscribe((data) => {
            model.imageId = data.data.id;

            this.usersService.editProfile(model)
              .subscribe((user: AppUser) => {
                this.sessionsStorage.updateUserInfo(user);
                this.router.navigate(['/']);
              });
          });
      } else {
        this.usersService.editProfile(model)
              .subscribe((user: AppUser) => {
                this.sessionsStorage.updateUserInfo(user);

                this.router.navigate(['/']);
              });
      }
  }

  changePhotoHandler(file: File): void {
    this.photoErrorMessage.next('');

    const ext = file['name'].substring(file['name'].lastIndexOf('.') + 1).toLowerCase();
    if (ext !== 'jpg' && ext !== 'png' && ext !== 'jpeg') {
      this.photoErrorMessage.next('Incorrect image format. Allowed formats is jpg, jpeg, png');
      return;
    }

    // 10 Mb
    if (file.size > 10485760) {
      this.photoErrorMessage.next('File is too large. Max file size is 10 Mb');
      return;
    }

    const img = new Image();
    img.onload = () => {
        if (img.width < 150 || img.height < 150) {
          this.photoErrorMessage.next('Minimum size of avatar should be 150x150');
          return;
        }

        this.fileReader.onload = () => {
            const dialogRef = this.modalService.show(ImageCropComponent, {
                initialState: {
                    imageSource: this.fileReader.result,
                },
                class: 'image-crop',
            });

            (<ImageCropComponent>dialogRef.content).imageCropped
                .subscribe((e: string) => {
                  (this.imageInput.nativeElement as HTMLInputElement).value = '';
                  this.photo.next(e);
                });

            this.modalService.onHidden
                .subscribe(() => (this.imageInput.nativeElement as HTMLInputElement).value = '');
        };

        this.fileReader.readAsDataURL(file);
    };

    img.src = URL.createObjectURL(file);
  }

  deletePhotoHandler(): void {
    this.photo.next(null);
  }

  checkFillingStep(step: number): boolean {
    return this.fillingStep.getValue() === step;
  }

  private getModel() {
    return {
        firstName: this.userData.firstName || '',
        lastName: this.userData.lastName || '',
        phoneNumber: '',
        mobileNumber: null,
        idCode: null,
        country: '',
        state: '',
        city: '',
        address: '',
        zip: '',
        isComposer: false,
        imageId: null
    };
  }
}
