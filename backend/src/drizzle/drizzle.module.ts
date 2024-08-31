import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Inject, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as schema from './schema';

export const DRIZZLE_PROVIDER = 'DrizzleProvider';

export interface Database {
  drizzle: NodePgDatabase<typeof schema>;
  pgPool: Pool;
}

@Module({
  providers: [
    {
      provide: DRIZZLE_PROVIDER,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString,
          ssl: false,
        });

        return {
          drizzle: drizzle(pool, { schema }) as NodePgDatabase<typeof schema>,
          pgPool: pool,
        } as Database;
      },
    },
  ],
  exports: [DRIZZLE_PROVIDER],
})
export class DrizzleModule {
  constructor(@Inject(DRIZZLE_PROVIDER) private db: Database) {}

  async onModuleDestroy() {
    await this.db.pgPool.end();
  }
}
