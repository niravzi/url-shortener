import { Module } from '@nestjs/common';
import { URLShortenerModule } from './url-shortener/url-shortener.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    URLShortenerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
