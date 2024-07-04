import { NewsAndSentiments } from "@src/models/NewsAndSentiments.interface";
import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY = EnvVars.ALPHAVANTAGE_API_KEY;

interface NewsAndSentimentsParams {
  ticker: string;
}

async function getNewsAndSentimentsByTicker(
  params: NewsAndSentimentsParams,
): Promise<NewsAndSentiments> {

  const apiUrl = `${AlphavantageURLs.SearchBase}function=NEWS_SENTIMENT&`+ 
  `tickers=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };

  // Log the API URL and headers for debugging
  //console.log('API URL:', apiUrl);
  //console.log('Headers:', headers);

  try {
    const data: NewsAndSentiments = 
    await AxiosGet<NewsAndSentiments>(apiUrl, headers);

    // Log the fetched data for debugging
    //console.log('Fetched news and sentiments:', data);

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching news and sentiments:", error);
    throw error;
  }
}

export default {
  getNewsAndSentimentsByTicker,
} as const;


