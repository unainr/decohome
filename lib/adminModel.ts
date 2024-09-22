import  { Schema, Document, model, models } from 'mongoose';

interface IAdmin extends Document {
  email: string;
  password: string;
}

const adminSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Admin = models.Admin || model<IAdmin>('Admin', adminSchema);
