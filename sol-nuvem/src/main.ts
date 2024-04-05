import { NestFactory } from '@nestjs/core';
import { HomeModule } from './home/home.module';
// import { UsersModule } from './users/users.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(HomeModule);
  app.useStaticAssets(join(__dirname, '..', 'frontend'));
  app.setBaseViewsDir(join(__dirname, '..', 'frontend'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
