import { Comment } from './comment';
import { UserModel } from '../user/user-model';

export class CommentModel implements Comment {
    readonly id: number;
    readonly description: string;
    readonly customer?: UserModel;
    readonly rate: number;
    readonly createdAt: string;
    readonly updatedAt: string;

    constructor (product: Comment) {
        this.id = product.id;
        this.description = product.description;
        this.customer = product.customer;
        this.rate = product.rate;
        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
    }
}
