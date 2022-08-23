import { Profile as GithubProfile } from 'passport-github2';
import { Profile as GoogleProfile } from 'passport-github2';
import { VerifyCallback } from 'passport-google-oauth20';

import oauth2 from 'passport-oauth2';
import {
  findUserByProviderID,
  createUser,
  updateUserLastLogin,
} from '../service/userService';

async function verifyCallback(
  accessToken: string,
  refreshToken: string,
  profile: GithubProfile | GoogleProfile | any,
  done: oauth2.VerifyCallback | VerifyCallback,
) {
  console.log(`Verify callback ${profile.provider}`);

  const user = await findUserByProviderID(profile.id);

  if (!user) {
    // Creating new User
    const newUser = await createUser(profile);

    done(null, newUser._id);
  } else {
    // Updating Last Login
    const updateUser = await updateUserLastLogin(profile.id);

    done(null, updateUser?._id);
  }
}

export { verifyCallback };
