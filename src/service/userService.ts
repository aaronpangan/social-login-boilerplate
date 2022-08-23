import { Types } from 'mongoose';
import { User } from '../model/User';
import { Profile as GithubProfile } from 'passport-github2';
import { Profile as GoogleProfile } from 'passport-google-oauth20';

async function findUserByProviderID(providerId: string) {
  const user = await User.findOne({ providerId });

  return user;
}

async function findUserByID(_id: Types.ObjectId) {
  const user = await User.findById(_id);
  return user;
}

async function createUser(profile: GithubProfile | GoogleProfile | any) {
  const newUser = await User.create({
    email: profile._json?.email,
    username: profile.displayName,
    name: profile.displayName,
    provider: profile.provider,
    providerId: profile.id,
    createdAt: Date.now(),
    lastLogin: Date.now(),
  });

  await newUser.save();

  return newUser;
}

async function updateUserLastLogin(providerId: number | string) {
  const updateUser = await User.findOneAndUpdate(
    { providerId },
    {
      lastLogin: Date.now(),
    },
    { new: true },
  );

  return updateUser;
}
export { findUserByProviderID, findUserByID, createUser, updateUserLastLogin };
