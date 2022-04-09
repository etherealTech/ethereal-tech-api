import { resolve } from 'path';
import { env, cwd } from 'process';
import { AppOptions } from 'firebase-admin';

/**
 * Applicaiton Configs
 */
export const PORT = env.PORT || 3000;

export const APP_SECRET = env.APP_SECRET || 'secret';

export const FIREBASE_CREDENTIAL = resolve(cwd(), 'service-account.json');

export const FIREBASE_CONFIG: AppOptions = {
  databaseURL: env.FIREBASE_DATABASE_URL,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
};

/**
 * Database Configs
 */
export const PG_HOST = env.PG_HOST || 'localhost';

export const PG_PORT = parseInt(env.PG_PORT || '5432');

export const PG_USERNAME = env.PG_USERNAME || 'postgres';

export const PG_PASSWORD = env.PG_PASSWORD || 'postgres';

export const PG_DATABASE = env.PG_DATABASE || 'postgres';
