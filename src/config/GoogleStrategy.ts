import passportGoogle, {
  Strategy,
  VerifyCallback,
  Profile,
} from 'passport-google-oauth20';
import { GOOGLE_KEYS } from '../constants';
import { User } from '../model/User';

function googleStrategy(): Strategy {
  return new passportGoogle.Strategy(
    {
      clientID: GOOGLE_KEYS.CLIENT_ID,
      clientSecret: GOOGLE_KEYS.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    verifyCallbackGoogle,
  );
}
async function verifyCallbackGoogle(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback,
) {
  console.log('VERIFY CALLBACK GOOGLE');

  const user = await User.findOne({ providerId: profile.id });

  if (!user) {
    // Creating new User
    const newUser = await User.create({
      email: profile.emails?.[0].value,
      name: profile.displayName,
      provider: profile.provider,
      providerId: profile.id,
      createdAt: Date.now(),
      lastLogin: Date.now(),
    });
    console.log('NEW GOOGLE ACC CREATED');
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
    console.log('LOGIN');
    console.log(updateUser?._id);

    done(null, updateUser?._id);
  }
}
export { googleStrategy };
