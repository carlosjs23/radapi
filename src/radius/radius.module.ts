import { Module } from '@nestjs/common';
import { RadiusController } from './radius.controller';
import { UsersModule } from 'src/users/users.module';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  imports: [UsersModule, ProfilesModule],
  controllers: [RadiusController],
})
export class RadiusModule {}
