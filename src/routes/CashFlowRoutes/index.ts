import { Router } from "express";
import Paths from "@src/constants/Paths";
import CashFlowController from "@src/controllers/cashFlowController";

const CashFlowRouter = Router();

CashFlowRouter.post(
  Paths.CashFlow.GetByTicker,
  CashFlowController.getCashFlowByTicker,
);

export default CashFlowRouter;
