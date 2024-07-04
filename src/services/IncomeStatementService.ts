import { IncomeStatement } from "@src/models/IncomeStatement.interface";
import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY = EnvVars.ALPHAVANTAGE_API_KEY;

interface IncomeStatementParams {
  ticker: string;
}

function getIncomeStatementByTicker(
  params: IncomeStatementParams,
): Promise<IncomeStatement> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=INCOME_STATEMENT&` +
    `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  
  const headers = {
    Authorization: ALPHAVANTAGE_API_KEY,
  };
  return AxiosGet<IncomeStatement>(apiUrl, headers);
}

export default {
  getIncomeStatementByTicker,
} as const;
