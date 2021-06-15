import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchNotifierService {
    private searchLeaveNotifier = new BehaviorSubject<boolean>(false);

    constructor () {
    }

    notify(value: boolean) {
        this.searchLeaveNotifier.next(value);
    }

    getEvent() {
        return this.searchLeaveNotifier.asObservable();
    }
}
