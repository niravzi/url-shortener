import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const shortUrls = pgTable('short_urls', {
  id: uuid('id').primaryKey().defaultRandom(),
  originalUrl: text('original_url').notNull(),
  visits: integer('visits').notNull().default(0),
});

export type ShortUrl = typeof shortUrls.$inferSelect;
export type NewShortUrl = typeof shortUrls.$inferInsert;
