import { eq } from 'drizzle-orm';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { URLVisitEvent } from '../events/url-visit.event';
import { URLShortenerEvent } from '../events';
import { Database, DRIZZLE_PROVIDER } from '../../drizzle/drizzle.module';
import * as schema from '../../drizzle/schema';

@Injectable()
export class URLVisitListener {
  constructor(@Inject(DRIZZLE_PROVIDER) private db: Database) {}

  @OnEvent(URLShortenerEvent.URLVisited)
  async handleOrderCreatedEvent(event: URLVisitEvent) {
    const [shortUrl] = await this.db.drizzle
      .select()
      .from(schema.shortUrls)
      .where(eq(schema.shortUrls.shortCode, event.shortCode))
      .limit(1);

    if (!shortUrl) {
      return;
    }

    await this.db.drizzle
      .update(schema.shortUrls)
      // @ts-expect-error: https://github.com/drizzle-team/drizzle-orm/issues/2654
      .set({ visits: shortUrl.visits + 1 })
      .where(eq(schema.shortUrls.shortCode, event.shortCode));
  }
}
