import { Router } from "express";
import Paths from "@src/constants/Paths";
import GraphController from "@src/controllers/GraphController";

const GraphRouter = Router();

GraphRouter.get(Paths.Graph.GetByTicker, GraphController.getTimeSeriesByTicker);

export default GraphRouter;
