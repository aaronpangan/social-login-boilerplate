import mongoose from 'mongoose';
import dotenv from 'dotenv';
async function mongoConnect() {
  dotenv.config();
  const MONGO_URL = process.env.MONGO_URI as string;

  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log('CONNECTED TO THE DATABASE'))
    .catch((err) => console.log(err));
}

export { mongoConnect };
