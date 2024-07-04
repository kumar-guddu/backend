import { CashFlow } from "@src/models/CashFlow.interface";
import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY = EnvVars.ALPHAVANTAGE_API_KEY;

interface CashFlowParams {
  ticker: string;
}

function getCashFlowByTicker(params: CashFlowParams): Promise<CashFlow> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=CASH_FLOW&` +
    `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };

  return AxiosGet<CashFlow>(apiUrl, headers);
}

export default {
  getCashFlowByTicker,
} as const;



