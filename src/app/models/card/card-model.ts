import { Card } from './card';

export class CardModel implements Card {
    readonly id: number;
    readonly lastFour: string;
    readonly year: number;
    readonly month: number;
    readonly userId: number;
    readonly createdAt: string;
    readonly updatedAt: string;

    constructor (card: Card) {
        this.id = card.id;
        this.lastFour = card.lastFour;
        this.year = card.year;
        this.month = card.month;
        this.userId = card.userId;
        this.createdAt = card.createdAt;
        this.updatedAt = card.updatedAt;
    }
}
