import { Router } from "express";
import Paths from "@src/constants/Paths";
import BalanceSheetController from "@src/controllers/balanceSheetController";

const BalanceSheetRouter = Router();

BalanceSheetRouter.post(
  Paths.BalanceSheet.GetByTicker,
  BalanceSheetController.getBalanceSheetByTicker,
);

export default BalanceSheetRouter;
