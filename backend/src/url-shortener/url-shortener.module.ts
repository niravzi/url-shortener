import { Module } from '@nestjs/common';
import { URLShortenerController } from './url-shortener.controller';
import { URLShortenerService } from './url-shortener.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ShortCodeGeneratorService } from './short-code-generator.service';
import { URLVisitListener } from './listeners/url-visit.listener';

@Module({
  imports: [DrizzleModule],
  controllers: [URLShortenerController],
  providers: [URLShortenerService, ShortCodeGeneratorService, URLVisitListener],
})
export class URLShortenerModule {}
