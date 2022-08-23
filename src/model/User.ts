import { model, Schema } from 'mongoose';

interface IUser {
  email?: string;
  username?: string;
  name: string;
  provider: string;
  providerId: number;
  createdAt: Date;
  lastLogin: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  provider: { type: String, required: true, enum: ['github', 'google'] },
  providerId: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  lastLogin: { type: Date, required: true },
});

const User = model<IUser>('User', userSchema);

export { User, IUser };
