import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get(ConfigService);

  const firebaseAdminConfig: ServiceAccount = {
    projectId: config.get<string>('FIREBASE_ADMIN_ID'),
    clientEmail: config.get<string>('FIREBASE_ADMIN_CLIENT_EMAIL'),
    privateKey: config
      .get<string>('FIREBASE_ADMIN_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000, () => {
    logger.log(`PORT: ${process.env.PORT}`);
  });
}

bootstrap();
