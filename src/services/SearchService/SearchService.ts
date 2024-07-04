import { ICompanySearch } from "@src/models/Company.interface";
import CompanySearchParams from "@src/services/SearchService/Interface";
import AxiosGet from "@src/routes/axiosRoutes";
import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY = EnvVars.ALPHAVANTAGE_API_KEY;

interface IAlphaVantageResponse {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

export interface ICompanyResponse {
  bestMatches: IAlphaVantageResponse[];
}

async function getCompanyListByTicker(
  params: CompanySearchParams,
): Promise<ICompanySearch[]> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=SYMBOL_SEARCH&`+
  `keywords=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;

  const headers = {
    Authorization: ALPHAVANTAGE_API_KEY,
  };

  const searchResponse = await AxiosGet<ICompanyResponse>(apiUrl, headers);
  return searchResponse.bestMatches.map((match) => ({
    symbol: match["1. symbol"],
    name: match["2. name"],
    type: match["3. type"],
    region: match["4. region"],
    marketOpen: match["5. marketOpen"],
    marketClose: match["6. marketClose"],
    timezone: match["7. timezone"],
    currency: match["8. currency"],
    matchScore: match["9. matchScore"],
  }));
}


export default {
  getCompanyListByTicker,
} as const;
