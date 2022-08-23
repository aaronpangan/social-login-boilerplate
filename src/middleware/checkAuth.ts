import { NextFunction, Request, Response } from 'express';

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user) {
    return next();
  } else res.redirect('/');
}

function isNotLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated() && !req.user) {
    return next();
  } else res.redirect('/dashboard');
}
export { isLoggedIn, isNotLoggedIn };
