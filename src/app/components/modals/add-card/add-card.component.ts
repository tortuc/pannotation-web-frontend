import { ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';

import { cardFormControls, cardFormErrors } from './add-card-form.configs';
import { expirationDateValidation } from '../../../validation/expiration-date-validation';
import { CreateCard } from './create-card';

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html',
    styleUrls: ['./add-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCardComponent implements OnInit, OnDestroy {
    @Input() title: string;

    formData = new Subject<CreateCard>();
    addCardForm: FormGroup;

    constructor(public readonly dialogRef: BsModalRef,
                private readonly formBuilder: FormBuilder,
                private readonly translateService: TranslateService) {
    }

    private obtainErrorText(fieldName: string, errorName: string): string {
        return cardFormErrors(this.translateService)[fieldName][errorName];
    }

    ngOnInit(): void {
        this.addCardForm = this.formBuilder.group(cardFormControls, {
            validator: expirationDateValidation()
        });
    }

    ngOnDestroy(): void {
        this.formData.complete();
    }

    getErrorMessage(fieldName: string): string {
        const controlErrors = this.addCardForm.controls[fieldName].errors;
        let errorText = 'error';
        Object.keys(controlErrors).forEach((error) => {
            if (error) {
                return errorText = this.obtainErrorText(fieldName, error);
            }
        });
        return errorText;
    }

    submit(): void {
        this.formData.next(this.addCardForm.value as CreateCard);
        this.dialogRef.hide();
    }
}
