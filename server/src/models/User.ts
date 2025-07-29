import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  otpCode?: string;
  otpExpires?: Date;
  googleId?: string;
  name?: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    otpCode: { type: String },
    otpExpires: { type: Date },
    googleId: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);