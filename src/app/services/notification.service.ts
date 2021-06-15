import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

import { NotificationLevels } from '../models/notifications/notifications-levels';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {

    constructor(private toasterService: ToasterService, private translate: TranslateService) {
    }

    open(message: string, level = 'success') {
        this.toasterService.pop(NotificationLevels[level], level, this.translate.instant(message));
    }
}
