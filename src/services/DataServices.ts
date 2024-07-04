import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY=EnvVars.ALPHAVANTAGE_API_KEY;

// interface BalanceSheetParams {
//   ticker: string;
// }


interface Params {
  ticker: string;
  SERVICE_TYPE: string
}


function getDataServices<T>(params: Params): Promise<T> {
  const apiUrl = 
  `${AlphavantageURLs.SearchBase}function=${params.SERVICE_TYPE}&` +
  `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };
  return AxiosGet(apiUrl, headers);
}

export default {
  getDataServices,
} as const;
