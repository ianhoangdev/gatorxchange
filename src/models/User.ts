import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  uid?: string;
  name: string;
  email: string;
  university?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  uid: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  university: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
