import { BehaviorSubject } from 'rxjs';

export class Faq {
    readonly isCollapsed = new BehaviorSubject(true);

    constructor(
        readonly title: string,
        readonly text: string) {
    }

    toggle(): void {
        this.isCollapsed.next(!this.isCollapsed.getValue());
    }
}
