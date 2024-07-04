import { Router } from "express";
import Paths from "@src/constants/Paths";
import FormulaMetricsController from
  "@src/controllers/FormulaBuilderControllers/FormulaMetricsController";

import CustomRatioRouter from "./CustomRatioRoute";

const FormulaRouter = Router();

FormulaRouter.get(Paths.Formula.metrics, FormulaMetricsController.getMetrics);

FormulaRouter.get(
  Paths.Formula.metrics + "/:ticker",
  FormulaMetricsController.getMetrics,
);

FormulaRouter.use(Paths.Formula.customRatio, CustomRatioRouter);

export default FormulaRouter;
