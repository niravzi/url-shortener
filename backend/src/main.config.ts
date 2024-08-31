import { ValidationPipe } from './pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

export function mainConfig(app: INestApplication) {
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Requested-With', 'Accept'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
}
