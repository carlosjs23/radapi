import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RadiusModule } from './radius/radius.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [TypeOrmModule.forRoot(), RadiusModule, UsersModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
