import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
    title: string;
    message: string;
    approvedState = new BehaviorSubject<boolean>(false);

    constructor(public readonly dialogRef: BsModalRef) {
    }

    onDeclineClick(): void {
        this.approvedState.next(false);
        this.dialogRef.hide();
    }

    onAcceptClick(): void {
        this.approvedState.next(true);
        this.dialogRef.hide();
    }
}
