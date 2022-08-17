import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_KEYS = {
  CLIENT_ID: process.env.google_client_id as string,
  CLIENT_SECRET: process.env.google_client_secret as string,
};

const COOKIE_SECRET = {
  COOKIE_SECRET1: process.env.cookie_secret1 as string,
  COOKIE_SECRET2: process.env.cookie_secret2 as string,
};

export { GOOGLE_KEYS, COOKIE_SECRET };
