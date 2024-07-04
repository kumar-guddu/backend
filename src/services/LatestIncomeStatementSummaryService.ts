import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
// eslint-disable-next-line

import { IncomeStatement } from "@src/models/IncomeStatement.interface";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY=EnvVars.ALPHAVANTAGE_API_KEY;

// interface BalanceSheetParams {
//   ticker: string;
// }



interface LatestIncomeStatementSummaryParams {
  ticker: string;
}


function getLatestIncomeStatementSummaryByTicker(
  params:LatestIncomeStatementSummaryParams): Promise<IncomeStatement> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=INCOME_STATEMENT&` + 
  `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;

  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };
  return AxiosGet(apiUrl, headers); 
}

export default {
  getLatestIncomeStatementSummaryByTicker,
} as const;



