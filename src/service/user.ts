import { Profile, VerifyCallback } from 'passport-google-oauth20';
import oauth2 = require('passport-oauth2');

function verifyCallback(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback | oauth2.VerifyCallback,
) {
  console.log('VERIFY CALLBACK');

  console.log(profile.provider);
  done(null, profile);
}

export { verifyCallback };
