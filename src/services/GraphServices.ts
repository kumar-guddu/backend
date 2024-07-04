import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
import { TimeSeriesDataResponse } from "@src/models/GraphInterface";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY=EnvVars.ALPHAVANTAGE_API_KEY;

// interface BalanceSheetParams {
//   ticker: string;
// }


export interface GraphParams {
  ticker: string;
  timeFrame: string;
  interval?: string;
}


function getTimeSeriesByTicker(
  params: GraphParams,
): Promise<TimeSeriesDataResponse> {
  
  const apiUrl = `${AlphavantageURLs.SearchBase}function=${params.timeFrame}` +
  `&symbol=${params.ticker}` +
  `${params.interval ? `&interval=${params.interval}` : ""}` +
  `&apikey=${ALPHAVANTAGE_API_KEY}`;


  const headers = {
    Authorization: ALPHAVANTAGE_API_KEY,
  };
  return AxiosGet(apiUrl, headers);
}

export default {
  getTimeSeriesByTicker,
} as const;
