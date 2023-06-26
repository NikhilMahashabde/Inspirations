import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String },
  email: { type: String },
  passwordHash: { type: String },
});

//Converting from commonJS to ESM
const Users = mongoose.model<UserDocument>("User", userSchema);

export default Users;
