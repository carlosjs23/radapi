import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    providers: [ProfileService],
    controllers: [ProfilesController],
    exports: [ProfileService],
})
export class ProfilesModule { }
