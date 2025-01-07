// models/User.ts
import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

export interface IUser {
  name?: string;
  email: string;
  password?: string;
  image?: string;
  emailVerified?: Date;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  image: String,
  emailVerified: Date,
}, {
  timestamps: true,
});

const User = models.User || model('User', userSchema);

export default User;