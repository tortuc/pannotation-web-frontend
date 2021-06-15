import { File } from './file';

export class FileModel {
    readonly id: number;
    readonly path: string;
    readonly type: string;

    constructor(data: File) {
        this.id = data.id;
        this.path = data.path;
        this.type = data.type;
    }
}
