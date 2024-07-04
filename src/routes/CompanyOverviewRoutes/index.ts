import { Router } from "express";
import Paths from "@src/constants/Paths";
import CompanyOverviewController
  from "@src/controllers/CompanyOverviewController";

const CompanyOverviewRouter = Router();
CompanyOverviewRouter.get(
  Paths.BalanceSheet.GetByTicker,
  CompanyOverviewController.getCompanyOverviewByTicker,
);

export default CompanyOverviewRouter;