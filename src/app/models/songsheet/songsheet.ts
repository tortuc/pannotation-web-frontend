import { ImageResponseModel } from '../image';
import { FileModel } from '../file/file-model';

export interface Songsheet {
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
}
