import { Module } from '@nestjs/common';
import { URLShortenerController } from './url-shortener.controller';
import { URLShortenerService } from './url-shortener.service';
import { ShortCodeGeneratorService } from './short-code-generator.service';
import { URLVisitListener } from './listeners/url-visit.listener';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [URLShortenerController],
  providers: [URLShortenerService, ShortCodeGeneratorService, URLVisitListener],
})
export class URLShortenerModule {}
