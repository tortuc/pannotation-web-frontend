import { ImageRequest } from './image-request';
import { ImageResponseModel } from './imageResponseModel';
import { ImageMeta } from './image-meta';

export class ImageRequestModel implements ImageRequest {
    data: ImageResponseModel;
    meta: ImageMeta;

    constructor(imageRequest: ImageRequest) {
        this.data = imageRequest.data;
        this.meta = imageRequest.meta;
    }
}
