import { FileModel } from '../file/file-model';
import { ImageResponseModel } from '../image';
import { Songsheet } from './songsheet';

export class SongsheetModel implements Songsheet {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly producer: string;
    readonly arranger: string;
    readonly artistName: string;
    readonly youTubeLink: string;
    readonly price: number;
    readonly isTop: boolean;
    readonly preview: FileModel;
    readonly track: FileModel;
    readonly image: ImageResponseModel;
    readonly instruments: string[];
    readonly genres: string[];
    readonly fileType: string;

    constructor(data: Songsheet) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.producer = data.producer;
        this.arranger = data.arranger;
        this.artistName = data.artistName;
        this.youTubeLink = data.youTubeLink;
        this.price = data.price;
        this.isTop = data.isTop;
        this.preview = data.preview;
        this.track = data.track;
        this.image = data.image;
        this.instruments = data.instruments;
        this.genres = data.genres;
        this.fileType = data.fileType;
    }

    get getInstruments(): string {
        if (!this.instruments ||
            !this.instruments.length) {
            return '';
        }

        const contentToShow: string[] = this.instruments;

        const contentToShowLength = contentToShow.length;
        return (contentToShowLength <= 4
            ? contentToShow
            : contentToShow.slice(0, 4).concat('and more')).join(' · ');
    }

    get getGenres(): string {
        if (!this.genres ||
            !this.genres.length) {
            return '';
        }

        const contentToShow: string[] = this.genres;

        const contentToShowLength = contentToShow.length;
        return (contentToShowLength <= 4
            ? contentToShow
            : contentToShow.slice(0, 4).concat('and more')).join(' · ');
    }
}
