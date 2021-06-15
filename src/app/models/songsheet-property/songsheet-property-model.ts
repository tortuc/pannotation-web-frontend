import { SongsheetProperty } from './songsheet-property';

export class SongsheetPropertyModel implements SongsheetProperty {
    id: number;
    name: string;
}

export interface OtherfilesProperty {
    id: string;
    name: string;
}
