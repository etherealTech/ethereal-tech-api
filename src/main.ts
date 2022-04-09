import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './app.config';
import { initilaizeFirebase } from './firebase.init';
import { ExpressAdapter } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  await initilaizeFirebase();
  const app = await NestFactory.create(AppModule);
  (<ExpressAdapter>app.getHttpAdapter()).set('trust proxy', 1);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('/admin');
  await app.listen(PORT);
}

bootstrap();
