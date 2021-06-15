import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { SongsheetPropertyModel } from 'src/app/models/songsheet-property/songsheet-property-model';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent extends FieldType {
    get value(): Observable<string> {
        return this.formControl.valueChanges;
    }

    onSelect(item: string): void {
        this.formControl.setValue(item);
    }

    isChosen(item: string): boolean {
        if (this.to.chosen && Array.isArray(this.to.chosen)) {
            const arrray = this.to.chosen as Array<SongsheetPropertyModel>;
            return arrray.find(x => x.name === item) ? true : false;
        } else {
            return false;
        }
    }
}
