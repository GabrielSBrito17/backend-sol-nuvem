import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeController } from './home.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [HomeController],
  imports: [ConfigModule.forRoot(), UsersModule],
})
export class HomeModule {}
