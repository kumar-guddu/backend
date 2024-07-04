import { BalanceSheet } from "@src/models/BalanceSheet.interface";
import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY = EnvVars.ALPHAVANTAGE_API_KEY;

interface BalanceSheetParams {
  ticker: string;
}

function getBalanceSheetByTicker(
  params: BalanceSheetParams,
): Promise<BalanceSheet> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=BALANCE_SHEET&` +
    `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };

  return AxiosGet<BalanceSheet>(apiUrl, headers);
}

export default {
  getBalanceSheetByTicker,
} as const;
