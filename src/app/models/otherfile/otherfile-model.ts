import { FileModel } from '../file/file-model';
import { OtherFile } from './otherfile';
import { ImageModel } from '../image';

export class OtherFileModel {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly preview: ImageModel;
    readonly file: FileModel;
    readonly fileType: string;

    constructor(data: OtherFile) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.preview = new ImageModel(data.preview);
        this.file = new FileModel(data.file);
        this.fileType = data.fileType;
    }
}
