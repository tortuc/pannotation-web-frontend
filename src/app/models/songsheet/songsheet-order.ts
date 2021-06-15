import { File } from '../file/file';

export interface SongsheetOrder {
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly artistName: string;
    readonly arranger: string;
    readonly date: string;
    readonly file: File;
}
