import mongoose, { Schema, Document, model, models } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = models.User || model<IUser>('User', userSchema);
