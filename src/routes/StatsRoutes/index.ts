import { Router } from "express";
import Paths from "@src/constants/Paths";
import StatsController from "@src/controllers/StatsController";

const StatsRouter = Router();

StatsRouter.post(Paths.Statistics.GetByTicker,
  StatsController.getStatsByTicker);

export default StatsRouter;
