import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { __PROD__ } from './utils/constants';

const allowedOrigins = ['http://localhost:3000'];

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

  const app = await NestFactory.create(AppModule, { bodyParser: true });

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  if (!__PROD__) {
    app.use(morgan('dev'));
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 8000, () => {
    logger.log(
      `[${process.env.NODE_ENV}]: running on port ${process.env.PORT}`,
    );
  });
}

bootstrap();
