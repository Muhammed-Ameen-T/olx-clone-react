import { Schema, Document, model, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone?: string;
  googleId?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: false, unique: true },
    googleId: { type: String, unique: true, sparse: true }, // Optional, unique if present
  },
  { timestamps: true }
);

const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;