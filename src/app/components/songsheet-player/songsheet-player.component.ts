import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
    selector: 'app-songsheet-player',
    templateUrl: './songsheet-player.component.html',
    styleUrls: ['./songsheet-player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongsheetPlayerComponent implements OnInit, OnDestroy, OnChanges {
    @Input()
    trackPath: string;

    @Input()
    track?: string;

    timeSlider: number;
    volumeSlider: number;

    audio: HTMLAudioElement;

    trackLoaded: Observable<Event>;
    time: Observable<number>;
    readonly volumeSliderHidden: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {}

    ngOnInit(): void {
        if (this.trackPath) {
            this.initializeTrack(this.trackPath);
        }
    }

    change(e): void {
        this.audio.currentTime = e.newValue;
    }

    volumeChange(e): void {
        this.audio.volume = e.newValue;
    }

    rewindTime(value: number): void {
        this.audio.currentTime = this.audio.currentTime + value;
    }

    onDisableVolume(): void {
        this.audio.muted = !this.audio.muted;
    }

    private initializeTrack(path: string): void {
        this.audio = new Audio(path);
        this.time = fromEvent(this.audio, 'timeupdate')
            .pipe(
                tap(() => this.timeSlider = this.audio.currentTime),
                map((e: Event) => this.audio.currentTime * 1000),
                startWith(0)
            );

        this.trackLoaded = fromEvent(this.audio, 'canplay');

        this.timeSlider = this.audio.currentTime;
        this.volumeSlider = this.audio.volume;

        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            this.audio.autoplay = true;
            this.volumeSliderHidden.next(true);
        }
    }

    ngOnDestroy(): void {
        if (this.audio) {
            this.audio.pause();
            this.audio.removeAttribute('src');
            this.audio.load();
            this.audio = null;
        }
    }

    ngOnChanges({ track }: SimpleChanges): void {
        if (track && track.currentValue) {
            this.initializeTrack(URL.createObjectURL(track.currentValue));
        }
    }
}
