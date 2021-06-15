import { ImageResponseModel } from '../image';
import { CartItem } from './cart-item';

export class CartItemModel {
    readonly instruments: string[];
    readonly genres: string[];
    readonly name: string;
    readonly artistName: string;
    readonly price: number;
    readonly isTop: boolean;
    readonly image: ImageResponseModel;
    readonly id: number;

    constructor(data: CartItem) {
        this.instruments = data.instruments;
        this.genres = data.genres;
        this.name = data.name;
        this.artistName = data.artistName;
        this.price = data.price;
        this.isTop = data.isTop;
        this.image = data.image;
        this.id = data.id;
    }

    get getInstruments(): string {
        if (!this.instruments || !this.instruments.length) {
            return '';
        }

        const contentToShow: string[] = this.instruments;

        const contentToShowLength = contentToShow.length;
        return (contentToShowLength <= 4
            ? contentToShow
            : contentToShow.slice(0, 4).concat('and more')).join(' · ');
    }

    get getGenres(): string {
        if (!this.genres || !this.genres.length) {
            return '';
        }

        const contentToShow: string[] = this.genres;

        const contentToShowLength = contentToShow.length;
        return (contentToShowLength <= 4
            ? contentToShow
            : contentToShow.slice(0, 4).concat('and more')).join(' · ');
    }
}
