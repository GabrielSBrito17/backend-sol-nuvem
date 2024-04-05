import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeController } from './home.controller';
import { UsersModule } from 'src/users/users.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  controllers: [HomeController],
  imports: [ConfigModule.forRoot(), UsersModule, ClientModule],
})
export class HomeModule {}
