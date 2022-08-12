import express, { Request, Response } from 'express';
import { GOOGLE_KEYS } from '../constants';
import passport from 'passport';
const auth = express.Router();

// Google
auth.get('/google', (req: Request, res: Response) => {
  console.log(GOOGLE_KEYS.CLIENT_ID);
  res.send('MEOW');
});

auth.get('/google/callback', (req: Request, res: Response) => {});

// Logout
auth.get('/logout', (req: Request, res: Response) => {});
export default auth;
