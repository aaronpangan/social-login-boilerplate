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
    session: true,
  }),
  (req: Request, res: Response) => {
    console.log('Success in callback');
    res.redirect('/dashboard');
  },
);

auth.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  }),
  () => {
    console.log('GITHUB LOGIN');
  },
);
auth.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/failure',
    session: true,
  }),
  (req: Request, res: Response) => {
    console.log('Success in callback GITHUB');
    res.redirect('/dashboard');
  },
);

// Login failed
auth.get('/failure', (req: Request, res, Response) => {
  return res.send('Failed to log in');
});

// Logout
auth.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');
  return res.redirect('/');
});
export default auth;
