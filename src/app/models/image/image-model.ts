import { ImageResponseModel } from './imageResponseModel';

export class ImageModel implements ImageResponseModel {
    readonly id: number;
    readonly originalPath: string;
    readonly compactPath: string;

    constructor (avatar: ImageResponseModel) {
        this.id = avatar.id;
        this.compactPath = avatar.compactPath;
        this.originalPath = avatar.originalPath;
    }
}
