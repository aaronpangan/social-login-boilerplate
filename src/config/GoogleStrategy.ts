import passportGoogle, {
  Strategy,

} from 'passport-google-oauth20';
import { GOOGLE_KEYS } from '../constants';

import { verifyCallback } from './passportVerifyCallback';

function googleStrategy(): Strategy {
  return new passportGoogle.Strategy(
    {
      clientID: GOOGLE_KEYS.CLIENT_ID,
      clientSecret: GOOGLE_KEYS.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    verifyCallback,
  );
}

export { googleStrategy };
