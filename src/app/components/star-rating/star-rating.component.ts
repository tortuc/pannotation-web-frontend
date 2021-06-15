import { Component, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
    @Output() rateChange = new BehaviorSubject<number>(5);
    highlighted = [1, 2, 3, 4, 5];
    highlightTill = 5;

    constructor () {
    }

    highlight (index: number): void {
        this.highlightTill = index;
    }

    rate(value: number): void {
        this.rateChange.next(value);
    }

    clear(): void {
        if (!this.rateChange.value) {
            this.highlightTill = 5;
            return;
        }
        this.highlight(this.rateChange.value);
    }

}
