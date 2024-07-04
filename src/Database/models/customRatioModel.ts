import { Schema, model, Document } from "mongoose";

export interface ICustomRatio extends Document {
  user: string;
  name: string;
  formula: string;
  description: string;
}

const customRatioSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  formula: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export function isCustomRatio(arg: unknown): boolean {
  if (!arg || typeof arg !== "object") {
    return false;
  }

  const customRatio = arg as ICustomRatio;

  return (
    "user" in customRatio &&
    "name" in customRatio &&
    "formula" in customRatio &&
    "description" in customRatio
  );
}

export default model<ICustomRatio>("custom_ratio", customRatioSchema);
