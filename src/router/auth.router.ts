import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
const auth = express.Router();

// Google
auth.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);

auth.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    session: true,
  }),
  (req: Request, res: Response) => {
    console.log('final callback GOOGLE');
    res.redirect('/dashboard');
  },
);

auth.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  }),
);
auth.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/failure',
    session: true,
  }),
  (req: Request, res: Response) => {
    console.log('final callback GITHUB');
    res.redirect('/dashboard');
  },
);

// Login failed
auth.get('/failure', (req: Request, res, Response) => {
  return res.send('Failed to log in');
});

// Logout
auth.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');

  return res.redirect('/');
});

export default auth;
