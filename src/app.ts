import express, { Request } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import auth from './router/auth.router';
import { COOKIE_SECRET } from './constants';
import cookieSession from 'cookie-session';
import { isLoggedIn, isNotLoggedIn } from './middleware/checkAuth';
import { googleStrategy } from './config/GoogleStrategy';
import { githubStrategy } from './config/GithubStrategy';
import { User } from './model/User';

const app = express();

passport.serializeUser((_id: any, done) => {
  console.log('Serialize _id');
  // Will create a cookie with the value of user
  done(null, _id);
});

passport.deserializeUser(async (_id: any, done) => {
  console.log('Deserialize User');
  // Will Extract the Cookie
  // Assigning a value to req.user

  const user = await User.findById(_id);

  done(null, user);
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
passport.use(googleStrategy());
passport.use(githubStrategy());

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
