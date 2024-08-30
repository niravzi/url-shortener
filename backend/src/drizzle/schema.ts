import { sql } from 'drizzle-orm';
import {
  bigint,
  date,
  integer,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const shortUrls = pgTable(
  'short_urls',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    originalUrl: text('original_url').notNull(),
    shortCode: text('short_code').notNull(),
    visits: integer('visits').notNull().default(0),
    createdAt: date('created_at').notNull().defaultNow(),
  },
  (table) => ({
    originalUrlIdx: uniqueIndex('original_url_idx').on(table.originalUrl),
    shortCodeIdx: uniqueIndex('short_code_idx').on(table.shortCode),
  }),
);

export type ShortUrl = typeof shortUrls.$inferSelect;
export type NewShortUrl = typeof shortUrls.$inferInsert;

export const urlsCount = pgTable('urls_count', {
  id: uuid('id').primaryKey().defaultRandom(),
  value: bigint('value', { mode: 'bigint' })
    .notNull()
    .default(sql`'0'::bigint`),
});

export type UrlsCount = typeof urlsCount.$inferSelect;
