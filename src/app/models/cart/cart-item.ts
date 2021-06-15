import { ImageResponseModel } from '../image';

export interface CartItem {
    readonly instruments: string[];
    readonly genres: string[];
    readonly name: string;
    readonly artistName: string;
    readonly price: number;
    readonly isTop: boolean;
    readonly image: ImageResponseModel;
    readonly id: number;
}
