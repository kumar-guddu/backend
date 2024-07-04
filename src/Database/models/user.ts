import { Schema, model, Document } from "mongoose";

// To let typescript know what is going to autocomplete during  coding process
export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  // userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailVerified: boolean; // New field for email verification
  provider: string; // Field to store auth provider (e.g., 'google')
  googleId?: string
}

const userSchema = new Schema({
  // userName: {
  //   type: String,
  //   unique: true,
  //   required: false,
  //   min: 4,
  //   lowercase: true,
  // },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  emailVerified: { type: Boolean, default: false }, // Default to false
  // Default to 'local'
  provider: { type: String, required: false, default: "local" },
  phoneNumber: {
    countryCode: { type: String, required: false },
    number: { type: String, required: false },
  },
  googleId: { type: String, unique: true, sparse: true }, 
});

export function isUser(arg: unknown): boolean {
  if (!arg || typeof arg !== "object") {
    return false;
  }

  const user = arg as IUser; // Cast arg to IUser to access its properties

  return (
    "email" in user &&
    "password" in user
  );
}

export default model<IUser>("users", userSchema);

// OTP Interface and Schema
export interface IOtp extends Document {
  email: string;
  otp: string; // Hashed OTP
  otpExpires: Date;
}

const otpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true }, // Store the hashed OTP
  otpExpires: { type: Date, required: true },
});

export const Otp = model<IOtp>("otps", otpSchema);


