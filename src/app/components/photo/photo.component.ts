import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

const imgPlaceholder = 'assets/img/image-placeholder-3.svg';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent implements OnInit, OnChanges {
    readonly image: BehaviorSubject<SafeUrl>;

    @Input() photo: string;
    @Input() size?: { width: number, height: number };
    @Input() placeholder?: string = imgPlaceholder;

    constructor(protected sanitizer: DomSanitizer) {
        this.image = new BehaviorSubject<SafeUrl>(this.placeholder);
    }

    ngOnInit(): void {
        this.image.next(this.placeholder);

        if (this.photo) {
            this.image.next(this.saveImage(this.photo));
        }
    }

    ngOnChanges({photo}: SimpleChanges): void {
        if (photo && photo.currentValue) {
            this.image.next(this.saveImage(photo.currentValue.changingThisBreaksApplicationSecurity || photo.currentValue));
        }

        if (photo.previousValue && !photo.currentValue) {
            this.image.next(imgPlaceholder);
        }
    }

    private saveImage(image: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(image && image.length ? image : imgPlaceholder);
    }
}
