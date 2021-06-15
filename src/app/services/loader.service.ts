import { ComponentRef, Inject, Injectable, OnDestroy } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { InjectionService } from './injection.service';
import { map, share } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class LoaderService implements OnDestroy {
    private readonly loadingProcesses = new BehaviorSubject<number>(0);
    private readonly subscriptions = new Subscription();

    private readonly loader: ComponentRef<LoaderComponent>;
    public readonly isLoaderShown: Observable<boolean>;

    constructor (
        private readonly injectionService: InjectionService,
        @Inject(DOCUMENT) private readonly document: Document,
    ) {
        this.isLoaderShown = this.loadingProcesses.pipe(
            map((loadingProcessesCount) => loadingProcessesCount > 0),
            share(),
        );

        this.subscriptions.add(
            this.isLoaderShown
                .subscribe((isLoaderShown) => {
                    if (!this.loader) { return; }

                    (isLoaderShown)
                        ? this.loader.instance.show()
                        : this.loader.instance.hide();
                }),
        );

        this.injectionService.setRootViewContainer(this.document.getElementById('loader-container'));
        this.loader = this.injectionService.appendComponent(LoaderComponent);
    }

    public start (): void {
        this.loadingProcesses.next(this.loadingProcesses.value + 1);
    }

    public stop (): void {
        this.loadingProcesses.next(this.loadingProcesses.value - 1);
    }

    public ngOnDestroy (): void {
        this.subscriptions.unsubscribe();
    }
}
