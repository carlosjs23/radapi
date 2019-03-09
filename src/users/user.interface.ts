import { UserStatusType } from './users.entity';

export interface UserInterface {
    readonly username: string;
    readonly password: string;
    readonly registerDate: string;
    readonly profileId: number;
    readonly status: UserStatusType;
}
