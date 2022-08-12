import express, { Request, Response } from 'express';
import { GOOGLE_KEYS } from '../constants';
import passport from 'passport';
const auth = express.Router();

// Google
auth.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
  () => {
    console.log('GOOGLE LOGIN');
  },
);

auth.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    session: false,
  }),
  (req: Request, res: Response) => {
    console.log('Success in callback');
    res.redirect('/');
  },
);

// Login failed
auth.get('/failure', (req: Request, res, Response) => {
  return res.send('Failed to log in');
});

// Logout
auth.get('/logout', (req: Request, res: Response) => {});
export default auth;
