import { FileModel } from '../file/file-model';
import { ImageModel } from '../image';

export interface OtherFile {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly preview: ImageModel;
    readonly file: FileModel;
    readonly fileType: string;
}
