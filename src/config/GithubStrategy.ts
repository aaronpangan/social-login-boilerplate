import passportGithub, { Profile, Strategy } from 'passport-github2';
import oauth2 from 'passport-oauth2';
import { GITHUB_KEYS } from '../constants';
import { User } from '../model/User';

function githubStrategy(): Strategy {
  return new passportGithub.Strategy(
    {
      clientID: GITHUB_KEYS.CLIENT_ID,
      clientSecret: GITHUB_KEYS.CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    verifyCallbackGithub,
  );
}

async function verifyCallbackGithub(
  accessToken: string,
  refreshToken: string,
  profile: Profile | any,
  done: oauth2.VerifyCallback,
) {
  console.log('VERIFY CALLBACK GITHUB');

  const user = await User.findOne({ providerId: profile.id });

  if (!user) {
    // Creating new User
    const newUser = await User.create({
      email : profile._json?.email,
      username: profile.displayName,
      name: profile.displayName,
      provider: profile.provider,
      providerId: profile.id,
      createdAt: Date.now(),
      lastLogin: Date.now(),
    });

    done(null, newUser._id);
  } else {
    // Updating Last Login
    const updateUser = await User.findOneAndUpdate(
      { providerId: profile.id },
      {
        lastLogin: Date.now(),
      },
      { new: true },
    );

    done(null, updateUser?._id);
  }
}
export { githubStrategy };
