import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
// eslint-disable-next-line

import { BalanceSheet } from "@src/models/BalanceSheet.interface";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY=EnvVars.ALPHAVANTAGE_API_KEY;

// interface BalanceSheetParams {
//   ticker: string;
// }



interface LatestBalanceSheetSummaryParams {
  ticker: string;
}


function getLatestBalanceSheetSummaryByTicker(
  params:LatestBalanceSheetSummaryParams): Promise<BalanceSheet> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=BALANCE_SHEET&` +
  `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };
  return AxiosGet(apiUrl, headers); 
}

export default {
  getLatestBalanceSheetSummaryByTicker,
} as const;



