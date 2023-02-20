import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  let app: INestApplication;
  if (process.env.NODE_ENV === 'development') {
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, '..', 'security', 'cert.key')),
      cert: fs.readFileSync(path.join(__dirname, '..', 'security', 'cert.pem')),
    };
    app = await NestFactory.create(AppModule, { httpsOptions });
  } else {
    app = await NestFactory.create(AppModule);
  }
  app.setGlobalPrefix('api');
  await app.listen(8090);
}
bootstrap();
