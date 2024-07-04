import { Schema, model, Document } from "mongoose";
//To let typescript know what is going to autocomplete during the coding process
export interface IWatchList extends Document {
  user: string;
  name: string;
  companies: string[];
}

const watchListSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  companies: {
    type: [String],
    required: true,
  },
});

export function isWatchList(arg: unknown): boolean {
  if (!arg || typeof arg !== "object") {
    return false;
  }

  // Cast arg to IUser to access its properties
  const watchList = arg as IWatchList; 

  return "user" in watchList && "companies" in watchList && "name" in watchList;
}

export default model<IWatchList>("watch_list", watchListSchema);
