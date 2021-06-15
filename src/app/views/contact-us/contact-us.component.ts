import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

import { ContactUsFormModel } from './contact-us.model';
import { getFields, getModel } from './contact-us.config';
import { SystemService } from '../../services/system.service';
import { resetForm } from '../../core/helpers/form-helper';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsComponent {
    contactUsForm: FormGroup;
    model: ContactUsFormModel;
    fields: FormlyFieldConfig[];

    constructor(private readonly toasterService: ToasterService,
                private readonly changeDetectionRef: ChangeDetectorRef,
                private readonly systemService: SystemService,
                private readonly translationService: TranslateService) {
        this.initForm();
    }

    submit(form: ContactUsFormModel) {
        this.systemService.postContactForm(form)
            .subscribe((message: string) => {
                this.toasterService.pop('success', message);
                resetForm(this.contactUsForm);
                this.changeDetectionRef.detectChanges();
            });
    }

    private initForm(): void {
        this.contactUsForm = new FormGroup({});
        this.model = getModel();
        this.fields = getFields(this.translationService);
    }
}
