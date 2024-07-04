import { Router } from "express";
import { getFormattedStatsByTicker }
  from "@src/controllers/GraphStatsController";
import Paths from "@src/constants/Paths";

const GraphStatsRouter = Router();

GraphStatsRouter.get(Paths.GraphStats.GetByTicker, getFormattedStatsByTicker);

export default GraphStatsRouter;