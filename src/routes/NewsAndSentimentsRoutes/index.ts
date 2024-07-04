import { Router } from "express";
import Paths from "@src/constants/Paths";
import NewsAndSentimentsController
  from "@src/controllers/NewsAndSentimentsController";

const NewsAndSentimentsRouter = Router();

NewsAndSentimentsRouter.post(
  Paths.NewsAndSentiments.GetByTicker,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  NewsAndSentimentsController.getNewsAndSentimentsByTicker,
);

export default NewsAndSentimentsRouter;
