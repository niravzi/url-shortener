import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_PROVIDER } from 'src/drizzle/drizzle.module';
import * as schema from '../drizzle/schema';
import { ShortCodeGeneratorService } from './short-code-generator.service';
import { eq } from 'drizzle-orm';
import { ShortUrlResponseDto } from './dto/short-url-response.dto';

@Injectable()
export class URLShortenerService {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private db: NodePgDatabase<typeof schema>,
    private readonly shortCodeGeneratorService: ShortCodeGeneratorService,
  ) {}

  async createShortUrl(originalUrl: string): Promise<ShortUrlResponseDto> {
    const existingUrls = await this.db
      .select()
      .from(schema.shortUrls)
      .where(eq(schema.shortUrls.originalUrl, originalUrl))
      .limit(1);

    if (existingUrls.length) {
      const [existingUrl] = existingUrls;

      return {
        shortCode: existingUrl.shortCode,
      };
    }

    return this.db.transaction(async (trx) => {
      const [urlsCount] = await trx.select().from(schema.urlsCount).limit(1);

      const shortCode = this.shortCodeGeneratorService.generateShortCode(
        urlsCount.value,
      );

      const [createdUrl] = await this.db
        .insert(schema.shortUrls)
        .values({
          originalUrl,
          shortCode,
        })
        .returning();

      await this.db
        .update(schema.urlsCount)
        .set({ value: urlsCount.value + BigInt(1) });

      return {
        shortCode: createdUrl.shortCode,
      };
    });
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    const existingUrls = await this.db
      .select()
      .from(schema.shortUrls)
      .where(eq(schema.shortUrls.shortCode, shortCode))
      .limit(1);

    if (!existingUrls.length) {
      return undefined;
    }

    const [firstUrl] = existingUrls;

    return firstUrl.originalUrl;
  }
}
