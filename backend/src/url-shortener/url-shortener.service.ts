import { Inject, Injectable } from '@nestjs/common';
import { Database, DRIZZLE_PROVIDER } from '../drizzle/drizzle.module';
import * as schema from '../drizzle/schema';
import { ShortCodeGeneratorService } from './short-code-generator.service';
import { eq } from 'drizzle-orm';
import { ShortUrlResponseDto } from './dto/short-url-response.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

const CACHE_TTL = 60 * 1000;

@Injectable()
export class URLShortenerService {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private db: Database,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly shortCodeGeneratorService: ShortCodeGeneratorService,
  ) {}

  async createShortUrl(originalUrl: string): Promise<ShortUrlResponseDto> {
    const existingUrls = await this.db.drizzle
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

    return this.db.drizzle.transaction(async (trx) => {
      const [urlsCount] = await trx.select().from(schema.urlsCount).limit(1);

      const shortCode = this.shortCodeGeneratorService.generateShortCode(
        urlsCount.value,
      );

      const [createdUrl] = await this.db.drizzle
        .insert(schema.shortUrls)
        .values({
          originalUrl,
          shortCode,
        })
        .returning();

      await this.db.drizzle
        .update(schema.urlsCount)
        .set({ value: urlsCount.value + BigInt(1) });

      return {
        shortCode: createdUrl.shortCode,
      };
    });
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    const cached = await this.cacheManager.get<string>(shortCode);

    if (cached) {
      return cached;
    }

    const existingUrls = await this.db.drizzle
      .select()
      .from(schema.shortUrls)
      .where(eq(schema.shortUrls.shortCode, shortCode))
      .limit(1);

    if (!existingUrls.length) {
      return undefined;
    }

    const [firstUrl] = existingUrls;

    await this.cacheManager.set(shortCode, firstUrl.originalUrl, CACHE_TTL);

    return firstUrl.originalUrl;
  }
}
