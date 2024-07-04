import { Router } from "express";
import Paths from "@src/constants/Paths";
import LatestDataSummaryController 
  from "@src/controllers/LatestDataSummaryController";

const StockPriceGraphRouter = Router();

StockPriceGraphRouter.get(
  Paths.LatestDataSummary.GetByTicker,
  LatestDataSummaryController.getLatestDataSummaryByTicker,
);

export default StockPriceGraphRouter;
