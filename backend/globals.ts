// Public Globals / Config (would be .env if it was secret)

import * as dotenv from 'dotenv';

// Load environment variables from .env files
dotenv.config({ path: '.env.local.public' });

if (!process.env.DB_FILE_NAME) {
    throw new Error('Missing DB_FILE_NAME environment variable');
}
export const DB_FILE_NAME = process.env.DB_FILE_NAME 
