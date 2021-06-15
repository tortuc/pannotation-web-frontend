import { Subject } from 'rxjs';

export class FormBase {
    readonly submitBtnDissabled: Subject<boolean> = new Subject();
}
