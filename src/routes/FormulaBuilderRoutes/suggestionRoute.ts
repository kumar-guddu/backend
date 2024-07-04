import { Router } from "express";
// import Paths from "@src/constants/Paths";
import SuggestionController 
  from "@src/controllers/FormulaBuilderControllers/suggestionController";

const SuggestionRouter = Router();

SuggestionRouter.get(
  "/suggestions", 
  SuggestionController.getSuggestions);

export default SuggestionRouter;