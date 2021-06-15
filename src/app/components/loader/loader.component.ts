import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
    @ViewChild('loader', { static: true })
    private loader: ElementRef;

    constructor (
        private readonly renderer: Renderer2,
    ) { }

    public show (): void {
        this.renderer.removeClass(this.loader.nativeElement, 'hidden');
    }

    public hide (): void {
        this.renderer.addClass(this.loader.nativeElement, 'hidden');
    }
}
