import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import NewsAndSentimentsService from "@src/services/NewsAndSentimentsService";
import {
  Feed,
  FilteredNewsAndSentiment,
  NewsAndSentiments,
  Topic,
} from "@src/models/NewsAndSentiments.interface"; 

async function getNewsAndSentimentsByTicker(
  req: IReq<{ ticker: string }>,
  res: IRes,
) {
  try {
    const { ticker } = req.params; // Safe destructuring
    const NewsAndSentimentsParams = {
      ticker,
    };

    const newsAndSentiments: NewsAndSentiments | null =
      await NewsAndSentimentsService.getNewsAndSentimentsByTicker(
        NewsAndSentimentsParams,
      );

    // Check if newsAndSentiments is defined
    if (!newsAndSentiments || !newsAndSentiments.feed) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .send({ error: "News and sentiments not found" });
    }

    const feedData: Feed[] = newsAndSentiments.feed;

    // Define the filter functions
    const filterNewsForIPO = (feed: Feed[]): FilteredNewsAndSentiment[] => {
      const filteredNewsAndSentiment: FilteredNewsAndSentiment[] = [];
      feed.forEach((item: Feed) => {
        if (item.topics.some((topic: Topic) => topic.topic === "IPO")) {
          const filteredItem: FilteredNewsAndSentiment = {
            title: item.title,
            url: item.url,
            time_published: item.time_published,
            summary: item.summary,
            source: item.source,
          };
          filteredNewsAndSentiment.push(filteredItem);
        }
      });

      return filteredNewsAndSentiment;
    };

    const filterNewsForEarning = (feed: Feed[]): FilteredNewsAndSentiment[] => {
      const filteredNewsAndSentiment: FilteredNewsAndSentiment[] = [];
      feed.forEach((item: Feed) => {
        if (item.topics.some((topic: Topic) => topic.topic === "Earnings")) {
          const filteredItem: FilteredNewsAndSentiment = {
            title: item.title,
            url: item.url,
            time_published: item.time_published,
            summary: item.summary,
            source: item.source,
          };
          filteredNewsAndSentiment.push(filteredItem);
        }
      });

      return filteredNewsAndSentiment;
    };

    const filterNewsForMergersAcquisitions = (
      feed: Feed[],
    ): FilteredNewsAndSentiment[] => {
      const filteredNewsAndSentiment: FilteredNewsAndSentiment[] = [];
      feed.forEach((item: Feed) => {
        if (
          item.topics.some(
            (topic: Topic) => topic.topic === "Mergers & Acquisitions",
          )
        ) {
          const filteredItem: FilteredNewsAndSentiment = {
            title: item.title,
            url: item.url,
            time_published: item.time_published,
            summary: item.summary,
            source: item.source,
          };
          filteredNewsAndSentiment.push(filteredItem);
        }
      });

      return filteredNewsAndSentiment;
    };

    // Get the filtered news
    const filteredNewsForIpo = filterNewsForIPO(feedData);
    const filteredNewsForEarning = filterNewsForEarning(feedData);
    const filteredNewsForMergersAcquisitions =
      filterNewsForMergersAcquisitions(feedData);
    const response = {
      ipo: filteredNewsForIpo,
      Earnings: filteredNewsForEarning,
      mergersAndAcquisitions: filteredNewsForMergersAcquisitions,
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    } else {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "An unknown error occurred" });
    }
  }
}

export default { getNewsAndSentimentsByTicker };
