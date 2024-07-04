import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
// eslint-disable-next-line
require("dotenv").config({ path: "@env/development.env" });
import { CashFlow } from "@src/models/CashFlow.interface";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY=EnvVars.ALPHAVANTAGE_API_KEY;

// interface BalanceSheetParams {
//   ticker: string;
// }



interface LatestCashFlowSummaryParams {
  ticker: string;
}


function getLatestCashFlowSummaryByTicker(
  params:LatestCashFlowSummaryParams): Promise<CashFlow> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=CASH_FLOW&` +
  `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };
  return AxiosGet(apiUrl, headers); 
}

export default {
  getLatestCashFlowSummaryByTicker,
} as const;



