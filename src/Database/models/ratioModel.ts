import { Schema, model, Document } from "mongoose";
//To let typescript know what is going to autocomplete during the coding process

export interface IHistoricalData {
  date: string;
  value: string;
}
export interface IRatios extends Document {

  ratioName: string;
  databaseRatioName: string,
  formula: string;
  description: string;
  historicalData: IHistoricalData[];
}
const historicalDataSchema = new Schema<IHistoricalData>({
  date: {
    type: String,

  },
  value: {
    type: String,

  },
}, { _id: false });
const ratiosSchema = new Schema({
  ratioName: {
    type: String,
    required: true,
  },
  databaseRatioName: {
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
  historicalData: [historicalDataSchema],
});

export default model<IRatios>("ratios", ratiosSchema);
