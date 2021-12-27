import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
  const logger = new Logger();
  // const firebaseAdminConfig: ServiceAccount = {
  //   projectId: process.env.FIREBASE_ADMIN_ID,
  //   clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  //   privateKey: `${process.env.FIREBASE_ADMIN_PRIVATE_KEY}`.replace(
  //     /\\n/g,
  //     '\n',
  //   ),
  // };

  // admin.initializeApp({
  //   credential: admin.credential.cert(firebaseAdminConfig),
  // });

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 8000, () => {
    logger.log(
      `[${process.env.NODE_ENV}]: running on port ${process.env.PORT}`,
    );
  });
}

bootstrap();
