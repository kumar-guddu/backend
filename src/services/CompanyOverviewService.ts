import CompanyOverview from "@src/models/CompanyOverview.interface";
import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY=EnvVars.ALPHAVANTAGE_API_KEY;

// interface BalanceSheetParams {
//   ticker: string;
// }




interface CompanyOverviewParams {
  ticker: string;
}


function getCompanyOverviewByTicker(
  params: CompanyOverviewParams,
): Promise<CompanyOverview> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=OVERVIEW&`+
  `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;

  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };
  return AxiosGet(apiUrl, headers);
}

export default {
  getCompanyOverviewByTicker,
} as const;



