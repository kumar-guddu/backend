import { Router } from "express";
import Paths from "@src/constants/Paths";
// import IncomeStatementController
//   from "@src/controllers/IncomeStatementController";

import IncomeStatementController
  from "@src/controllers/incomeStatementController";

const IncomeStatementRouter = Router();

IncomeStatementRouter.post(
  Paths.IncomeStatement.GetByTicker,
  IncomeStatementController.getIncomeStatementByTicker,
);

export default IncomeStatementRouter;
