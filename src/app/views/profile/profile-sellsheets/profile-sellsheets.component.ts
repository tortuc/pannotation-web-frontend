import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-profile-sellsheets',
    templateUrl: './profile-sellsheets.component.html',
    styleUrls: ['./profile-sellsheets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileSellsheetsComponent {
    readonly agreementCheckbox: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor() {
    }

    agreementCheckboxChange(): void {
        this.agreementCheckbox.next(!this.agreementCheckbox.getValue());
    }

    checkAgreement = (event) => {
        if (!this.agreementCheckbox.getValue()) {
            event.preventDefault();
        }
    }
}
