import { ProfileServiceType } from './profile.entity';

export interface ProfileInterface {
    readonly name: string;
    readonly addressPool: string;
    readonly addressList: string;
    readonly accessPeriod: number;
    readonly service: ProfileServiceType;
}
