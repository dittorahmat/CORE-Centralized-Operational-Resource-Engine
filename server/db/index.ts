import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

export let db: ReturnType<typeof drizzle> | null = null;

if (connectionString && !connectionString.includes('MY_DATABASE_URL')) {
  try {
    const pool = new Pool({ connectionString });
    db = drizzle(pool, { schema });
    console.log('✅ Connected to PostgreSQL Neon Database via Drizzle ORM');
  } catch (err) {
    console.warn('⚠️ Failed to connect to Neon DB, operating with in-memory knowledge:', err);
  }
} else {
  console.log('ℹ️ DATABASE_URL not set or default placeholder. Using in-memory enterprise knowledge engine.');
}
