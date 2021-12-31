import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { __PROD__ } from './utils/constants';
import { ConfigService } from '@nestjs/config';
import { config as awsConfig } from 'aws-sdk';

const allowedOrigins = [
  'http://localhost:3000',
  'https://dgby-admin-client-stage.herokuapp.com',
];

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  app.use(cookieParser());

  const configService = app.get(ConfigService);
  awsConfig.update({
    region: configService.get('AWS_REGION'),
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
  });

  if (!__PROD__) {
    app.use(morgan('dev'));
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT || 8000, () => {
    logger.log(
      `[${process.env.NODE_ENV}]: running on port ${process.env.PORT}`,
    );
  });
}

bootstrap();
