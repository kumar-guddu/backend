import { Schema, model, Document } from "mongoose";
//To let typescript know what is going to autocomplete during the coding process
export interface ICompany extends Document {
  ticker: string;
  name: string;
  type: string;
}

const companySchema = new Schema({
  ticker: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model<ICompany>("companies", companySchema);
