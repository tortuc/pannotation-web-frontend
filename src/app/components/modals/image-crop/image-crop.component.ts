import { ChangeDetectionStrategy, Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { CropperComponent } from 'angular-cropperjs';

import { cropperConfig } from './cropper-config';

@Component({
    selector: 'app-image-crop',
    templateUrl: './image-crop.component.html',
    styleUrls: ['./image-crop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCropComponent {
    @ViewChild('angularCropper', {static: true}) public angularCropper: CropperComponent;

    @Output()
    public imageCropped: EventEmitter<string> = new EventEmitter<string>();

    public readonly cropperConfig = cropperConfig;

    public imageSource: string | ArrayBuffer;
    private scaleXposition = 1;
    private scaleYposition = 1;

    constructor (
        private readonly modalRef: BsModalRef,
    ) { }

    scaleX() {
        this.scaleXposition = this.scaleXposition > 0 ? -1 : 1;
        this.angularCropper.cropper.scaleX(this.scaleXposition);
    }

    scaleY() {
        this.scaleYposition = this.scaleYposition > 0 ? -1 : 1;
        this.angularCropper.cropper.scaleY(this.scaleYposition);
    }

    public decline (): void {
        this.modalRef.hide();
    }

    public accept (): void {
        this.imageCropped.emit(this.angularCropper.cropper.getCroppedCanvas({fillColor: '#fff'}).toDataURL('image/jpeg', 0.7));
        this.modalRef.hide();
    }
}
