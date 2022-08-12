import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import auth from './router/auth.router';
import { GOOGLE_KEYS } from './constants';
import passportGoogle from 'passport-google-oauth20';
const app = express();

passport.use(
  new passportGoogle.Strategy(
    {
      clientID: GOOGLE_KEYS.CLIENT_ID,
      clientSecret: GOOGLE_KEYS.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    verifyCallback,
  ),
);

function verifyCallback(
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any,
) {}
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    },
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(passport.initialize());
app.use(morgan('combined'));
app.use(express.json());

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export default app;
