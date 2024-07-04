import { DailyStockData } from "@src/models/DailyStockData.interface";
import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY=EnvVars.ALPHAVANTAGE_API_KEY;

// interface BalanceSheetParams {
//   ticker: string;
// }




interface Params {
  ticker: string;
}



function getCurrentStockPriceByTicker(params: Params): Promise<DailyStockData> {
  
  const apiUrl = `${AlphavantageURLs.SearchBase}function=TIME_SERIES_DAILY&` +
  `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;

  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };
  return AxiosGet(apiUrl, headers);
}

export default {
  getCurrentStockPriceByTicker,
} as const;
