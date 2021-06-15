export interface Card {
    readonly id?: number;
    readonly lastFour: string;
    readonly month: number;
    readonly year: number;
    readonly userId?: number;
    readonly createdAt?: string;
    readonly updatedAt?: string;
}
