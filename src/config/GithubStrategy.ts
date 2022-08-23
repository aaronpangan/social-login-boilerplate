import passportGithub, { Strategy } from 'passport-github2';
import { GITHUB_KEYS } from '../constants';

import { verifyCallback } from './passportVerifyCallback';

function githubStrategy(): Strategy {
  return new passportGithub.Strategy(
    {
      clientID: GITHUB_KEYS.CLIENT_ID,
      clientSecret: GITHUB_KEYS.CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    verifyCallback,
  );
}

export { githubStrategy };
