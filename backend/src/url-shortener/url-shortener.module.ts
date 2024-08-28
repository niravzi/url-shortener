import { Module } from '@nestjs/common';
import { URLShortenerController } from './url-shortener.controller';
import { URLShortenerService } from './url-shortener.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [URLShortenerController],
  providers: [URLShortenerService],
})
export class URLShortenerModule {}
