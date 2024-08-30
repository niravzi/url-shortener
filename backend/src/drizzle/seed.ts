import dotenv from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

dotenv.config({
  path: '.env',
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  const urlsCount = await db.select().from(schema.urlsCount);

  if (urlsCount.length) {
    return;
  }

  await db.insert(schema.urlsCount).values({});
}

main()
  .then(() => {
    console.log('Successfully seeded');
    pool.end();
  })
  .catch((error) => {
    console.log('Error while seeding database', error);
    process.exit(0);
  });
