import { IsString, IsDate, IsInt, IsEnum } from 'class-validator';
import { UserStatusType } from './users.entity';

export class CreateUserDto {
    @IsString() username: string;
    @IsString() password: string;
    @IsDate() registerDate: string;
    @IsInt() profileId: number;
    @IsString() status: UserStatusType;
}
