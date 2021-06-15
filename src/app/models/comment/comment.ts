import { UserModel } from '../user/user-model';

export interface Comment {
    readonly id: number;
    readonly description: string;
    readonly rate: number;
    readonly customer?: UserModel;
    readonly createdAt: string;
    readonly updatedAt: string;
}
