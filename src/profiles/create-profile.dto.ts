import { IsString, IsInt } from 'class-validator';

export class CreateProfileDto {
    @IsString() readonly name: string;
    @IsString() readonly addressPool: string;
    @IsString() readonly addressList: string;
    @IsInt() readonly accessPeriod: number;

}