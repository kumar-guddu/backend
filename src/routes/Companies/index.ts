import { Router } from "express";
import Paths from "@src/constants/Paths";
import CompanyController from "@src/controllers/companies";

const CompaniesRouter = Router();

CompaniesRouter.post(Paths.Company.add, CompanyController.addCompanies);

export default CompaniesRouter;
