import { Router } from "express";
import Paths from "@src/constants/Paths";
import SearchService from "@src/controllers/SearchController";

const searchRouter = Router();

searchRouter.get(
  Paths.Search.GetByTicker,
  SearchService.getCompanyListByTickerDataBase,
);

searchRouter.get(
  Paths.Search.alphavantage + Paths.Search.GetByTicker,
  SearchService.getCompanyListByTicker,
);

export default searchRouter;
