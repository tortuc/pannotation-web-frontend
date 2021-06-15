import { SongsheetOrder } from './songsheet-order';
import { FileModel } from '../file/file-model';

export class SongsheetOrderModel {
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly artistName: string;
    readonly arranger: string;
    readonly date: Date;
    readonly file: FileModel;

    constructor(data: SongsheetOrder) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.artistName = data.artistName;
        this.arranger = data.arranger;
        this.date = new Date(data.date);
        this.file = new FileModel(data.file);
    }
}
