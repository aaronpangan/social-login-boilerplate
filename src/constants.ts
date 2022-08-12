import dotenv from 'dotenv'
dotenv.config();

const GOOGLE_KEYS = {
  CLIENT_ID: process.env.google_client_id as string,
  CLIENT_SECRET: process.env.google_client_secret as string,
};

export { GOOGLE_KEYS };
