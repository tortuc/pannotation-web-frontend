import { ImageResponseModel } from './imageResponseModel';
import { ImageMeta } from './image-meta';

export interface ImageRequest {
    data: ImageResponseModel;
    meta: ImageMeta;
}
