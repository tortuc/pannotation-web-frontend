import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-view-container',
    templateUrl: './view-container.component.html',
    styleUrls: ['./view-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewContainerComponent {
}
