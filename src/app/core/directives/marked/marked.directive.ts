import { Renderer } from 'marked';
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { MarkedService } from '../../../services/marked.service';
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[marked]',
})
export class MarkedDirective implements OnChanges {
    private readonly renderer: Renderer;

    @Input()
    public text: string;

    constructor (
        private readonly elementRef: ElementRef,
        private readonly markedService: MarkedService,
    ) {
        this.renderer = this.markedService.renderer;

        marked.setOptions({
            sanitize: true,
        });
    }

    public ngOnChanges (): void {
        this.elementRef.nativeElement.innerHTML = marked(this.text, { renderer: this.renderer });
    }
}
