import mongoose, { Schema } from 'mongoose';
import { IUser } from 'shared/src/types/user.type';

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema); 