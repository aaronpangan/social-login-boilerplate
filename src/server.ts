import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import https from 'https';
import app from './app';
import { mongoConnect } from './db/Mongo';
dotenv.config();

const SSL = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem'),
};

const server = https.createServer(SSL, app);

async function startServer() {
  await mongoConnect();
  const port = process.env.port || 5000;
  server.listen(port, () => {
    console.log(`Server started at ${port}`);
  });
}

startServer();
