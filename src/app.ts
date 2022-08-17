import express, { Request } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import auth from './router/auth.router';
import { COOKIE_SECRET, GITHUB_KEYS, GOOGLE_KEYS } from './constants';
import passportGoogle from 'passport-google-oauth20';
import passportGithub from 'passport-github2';
import cookieSession from 'cookie-session';
import { isLoggedIn, isNotLoggedIn } from './middleware/checkAuth';

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
) {
  console.log('Success in verify');
  console.log(profile);
  done(null, profile);
}

passport.use(
  new passportGithub.Strategy(
    {
      clientID: GITHUB_KEYS.CLIENT_ID,
      clientSecret: GITHUB_KEYS.CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    verifyCallback2,
  ),
);

function verifyCallback2(
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any,
) {
  console.log(profile.username);
  done(null, profile.username);
}

passport.serializeUser((user: any, done) => {
  console.log('Serialize User');
  // Will create a cookie with the value of user
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  console.log('Deserialize User');
  console.log(user.displayName);
  // Assigning a value to req.user
  done(null, { ad: 'sample' });
});

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

app.use(
  cookieSession({
    name: 'session',
    maxAge: 60 * 60 * 60 * 1000,
    keys: [COOKIE_SECRET.COOKIE_SECRET1, COOKIE_SECRET.COOKIE_SECRET2],
  }),
);
app.use(passport.initialize());

// Allows serialization and deserialization
app.use(passport.session());

app.use(morgan('combined'));
app.use(express.json());

app.use('/auth', auth);

app.get('/', isNotLoggedIn, (req: Request, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/dashboard', isLoggedIn, (req, res) => {
  console.log('dashboard');

  res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});
export default app;
