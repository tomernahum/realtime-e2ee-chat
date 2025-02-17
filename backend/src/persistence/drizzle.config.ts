
import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
import { DB_FILE_NAME } from '../../globals';

// config({ path: '.public.env' });

export default defineConfig({
  out: './drizzle',
  schema: './src/persistance/schema-sqlite.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: DB_FILE_NAME
  },
});
