import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

(async () => {
  const PORT = process.env.PORT || process.env.port || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.enableCors();
  app.use(cookieParser());
  await app.listen(PORT);
})()
