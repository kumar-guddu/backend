import axios from "axios";
import { StatsResponse } from "@src/models/GraphStats.interface";

const baseUri = "http://localhost:3001/api";

export const fetchStatsByTicker = 
async (ticker: string): Promise<StatsResponse> => {
  const response = 
  await axios.get<StatsResponse>(`${baseUri}/statistics/${ticker}`);
  // console.log(response);
  return response.data;
};