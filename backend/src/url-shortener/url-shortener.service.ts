import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_PROVIDER } from 'src/drizzle/drizzle.module';
import * as schema from '../drizzle/schema';

@Injectable()
export class URLShortenerService {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private connection: NodePgDatabase<typeof schema>,
  ) {}

  createShortUrl(url: string) {
    return url;
  }

  getOriginalUrl(shortUrlId: string) {
    return shortUrlId;
  }
}
