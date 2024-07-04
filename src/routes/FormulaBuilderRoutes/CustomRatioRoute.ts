import { Router } from "express";
import Paths from "@src/constants/Paths";
import CustomRatioController from
  "@src/controllers/FormulaBuilderControllers/CustomRatioController";
import { authenticateToken } from "@src/middleware/authenticateUser";

const CustomRatioRouter = Router();

CustomRatioRouter.post(
  Paths.Formula.create,
  authenticateToken,
  CustomRatioController.createCustomRatio,
);
CustomRatioRouter.get(
  Paths.Formula.getAll,
  authenticateToken,
  CustomRatioController.getCustomRatios,
);
CustomRatioRouter.get(
  Paths.Formula.getById,
  authenticateToken,
  CustomRatioController.getCustomRatio,
);

CustomRatioRouter.get(Paths.Formula.getValue,
  authenticateToken, CustomRatioController.getValueCustomRatio);

CustomRatioRouter.post(Paths.Formula.getValidate,
  authenticateToken, CustomRatioController.validateCustomRatio);
  

export default CustomRatioRouter;
