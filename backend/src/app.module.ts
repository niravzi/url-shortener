import { Module } from '@nestjs/common';
import { URLShortenerModule } from './url-shortener/url-shortener.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), URLShortenerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
